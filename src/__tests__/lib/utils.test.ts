import { formatDate, debounce, storage, getTerminalPath, getTypingFontSize, getLineText, getLineColor } from '@/lib/utils'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('formatDate', () => {
  it('formats date correctly', () => {
    const result = formatDate('2023-12-25')
    expect(result).toBe('December 2023')
  })

  it('handles different date formats', () => {
    const result = formatDate('2023-01-15T10:30:00Z')
    expect(result).toBe('January 2023')
  })

  it('handles invalid date gracefully', () => {
    const result = formatDate('invalid-date')
    expect(result).toBe('Invalid Date')
  })
})

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('debounces function calls', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 1000)

    // Call multiple times quickly
    debouncedFn('test1')
    debouncedFn('test2')
    debouncedFn('test3')

    expect(mockFn).not.toHaveBeenCalled()

    // Fast forward time
    jest.advanceTimersByTime(1000)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('test3')
  })

  it('resets timer on subsequent calls', () => {
    const mockFn = jest.fn()
    const debouncedFn = debounce(mockFn, 1000)

    debouncedFn('test1')
    
    // Advance time but not enough to trigger
    jest.advanceTimersByTime(500)
    expect(mockFn).not.toHaveBeenCalled()

    // Call again, should reset timer
    debouncedFn('test2')
    jest.advanceTimersByTime(500)
    expect(mockFn).not.toHaveBeenCalled()

    // Advance to trigger
    jest.advanceTimersByTime(500)
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith('test2')
  })
})

describe('storage', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear()
    localStorageMock.setItem.mockClear()
    localStorageMock.removeItem.mockClear()
  })

  describe('get', () => {
    it('returns value from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('test-value')
      const result = storage.get('test-key')
      expect(result).toBe('test-value')
      expect(localStorageMock.getItem).toHaveBeenCalledWith('test-key')
    })

    it('returns null when key does not exist', () => {
      localStorageMock.getItem.mockReturnValue(null)
      const result = storage.get('non-existent')
      expect(result).toBeNull()
    })

    it('returns null on error', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage error')
      })
      const result = storage.get('test-key')
      expect(result).toBeNull()
    })
  })

  describe('set', () => {
    it('sets value in localStorage', () => {
      storage.set('test-key', 'test-value')
      expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', 'test-value')
    })

    it('handles errors silently', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage error')
      })
      expect(() => storage.set('test-key', 'test-value')).not.toThrow()
    })
  })

  describe('remove', () => {
    it('removes value from localStorage', () => {
      storage.remove('test-key')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key')
    })

    it('handles errors silently', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('Storage error')
      })
      expect(() => storage.remove('test-key')).not.toThrow()
    })
  })
})

describe('getTerminalPath', () => {
  it('maps root path to /Home', () => {
    expect(getTerminalPath('/')).toBe('/Home')
  })

  it('maps about path to /Personal', () => {
    expect(getTerminalPath('/about')).toBe('/Personal')
  })

  it('maps professional path to /Professional', () => {
    expect(getTerminalPath('/professional')).toBe('/Professional')
  })

  it('maps projects path to /Projects', () => {
    expect(getTerminalPath('/projects')).toBe('/Projects')
  })

  it('maps content path to /Content', () => {
    expect(getTerminalPath('/content')).toBe('/Content')
  })

  it('maps contact path to /Contact', () => {
    expect(getTerminalPath('/contact')).toBe('/Contact')
  })

  it('handles trailing slashes', () => {
    expect(getTerminalPath('/about/')).toBe('/Personal')
    expect(getTerminalPath('/projects/')).toBe('/Projects')
  })

  it('returns /Home for unknown paths', () => {
    expect(getTerminalPath('/unknown')).toBe('/Home')
    expect(getTerminalPath('/random/path')).toBe('/Home')
  })

  it('handles empty path', () => {
    expect(getTerminalPath('')).toBe('/Home')
  })
})

describe('getTypingFontSize', () => {
  it('returns correct font size for greeting', () => {
    expect(getTypingFontSize('greeting')).toBe('text-2xl md:text-2xl lg:text-3xl font-bold')
  })

  it('returns correct font size for intro', () => {
    expect(getTypingFontSize('intro')).toBe('text-2xl font-bold')
  })

  it('returns correct font size for body', () => {
    expect(getTypingFontSize('body')).toBe('text-2xl font-bold')
  })

  it('returns correct font size for narrative', () => {
    expect(getTypingFontSize('narrative')).toBe('text-2xl font-bold')
  })

  it('returns default font size for unknown types', () => {
    expect(getTypingFontSize('unknown')).toBe('text-2xl font-bold')
    expect(getTypingFontSize('random')).toBe('text-2xl font-bold')
  })
})

describe('getLineText', () => {
  it('returns greeting text when present', () => {
    const line = { greeting: 'Hello World' }
    expect(getLineText(line)).toBe('Hello World')
  })

  it('returns intro text when present', () => {
    const line = { intro: 'Introduction text' }
    expect(getLineText(line)).toBe('Introduction text')
  })

  it('returns body text when present', () => {
    const line = { body: 'Body content' }
    expect(getLineText(line)).toBe('Body content')
  })

  it('returns narrative text when present', () => {
    const line = { narrative: 'Narrative story' }
    expect(getLineText(line)).toBe('Narrative story')
  })

  it('returns text when present', () => {
    const line = { text: 'Plain text' }
    expect(getLineText(line)).toBe('Plain text')
  })

  it('prioritizes greeting over other fields', () => {
    const line = { 
      greeting: 'Hello',
      intro: 'Intro',
      body: 'Body',
      narrative: 'Narrative',
      text: 'Text'
    }
    expect(getLineText(line)).toBe('Hello')
  })

  it('returns empty string when no text fields present', () => {
    const line = { color: 'blue' }
    expect(getLineText(line)).toBe('')
  })

  it('returns empty string for empty object', () => {
    const line = {}
    expect(getLineText(line)).toBe('')
  })
})

describe('getLineColor', () => {
  it('returns specified color', () => {
    const line = { color: 'text-red-500' }
    expect(getLineColor(line)).toBe('text-red-500')
  })

  it('returns default color when no color specified', () => {
    const line = { text: 'Some text' }
    expect(getLineColor(line)).toBe('text-primary-blue')
  })

  it('returns default color for empty object', () => {
    const line = {}
    expect(getLineColor(line)).toBe('text-primary-blue')
  })
})
