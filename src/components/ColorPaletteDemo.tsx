import React from 'react';
import { YellowAccent } from './ui/index';

export default function ColorPaletteDemo() {
  return (
    <div className="py-12 bg-primary-navy">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary-blue">
          Updated Color Palette
        </h2>
        
        {/* Color Swatches */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          <div className="text-center">
            <div className="w-20 h-20 rounded-lg bg-primary-navy mx-auto mb-2 border border-primary-blue/20"></div>
            <p className="text-primary-blue text-sm">Navy</p>
            <p className="text-primary-blue/70 text-xs">#0B1426</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 rounded-lg bg-primary-blue mx-auto mb-2 border border-primary-blue/20"></div>
            <p className="text-primary-blue text-sm">Blue</p>
            <p className="text-primary-blue/70 text-xs">#22D3EE</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 rounded-lg bg-primary-magenta mx-auto mb-2 border border-primary-blue/20"></div>
            <p className="text-primary-blue text-sm">Magenta</p>
            <p className="text-primary-blue/70 text-xs">#EC4899</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 rounded-lg bg-primary-sunset-orange mx-auto mb-2 border border-primary-blue/20"></div>
            <p className="text-primary-blue text-sm">Sunset Orange</p>
            <p className="text-primary-blue/70 text-xs">#FD5E53</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 rounded-lg bg-primary-yellow mx-auto mb-2 border border-primary-blue/20"></div>
            <p className="text-primary-blue text-sm">Sun Yellow</p>
            <p className="text-primary-blue/70 text-xs">#FFEB3B</p>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="space-y-8">
          <div className="bg-primary-navy/50 backdrop-blur-sm p-6 rounded-lg border border-primary-blue/20">
            <h3 className="text-xl font-semibold mb-4 text-primary-blue">Sun Yellow Usage Examples</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-primary-yellow font-semibold mb-2">Text Highlight</h4>
                  <p className="text-primary-blue">
                    This is a <YellowAccent variant="text">highlighted text</YellowAccent> using sun yellow.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-primary-yellow font-semibold mb-2">Background Highlight</h4>
                  <YellowAccent variant="background" className="inline-block px-3 py-1 rounded">
                    Background highlight
                  </YellowAccent>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-primary-yellow font-semibold mb-2">Border Accent</h4>
                  <YellowAccent variant="border" className="inline-block px-3 py-1 rounded">
                    Bordered element
                  </YellowAccent>
                </div>
                
                <div>
                  <h4 className="text-primary-yellow font-semibold mb-2">Important Button</h4>
                  <YellowAccent variant="highlight" className="inline-block px-4 py-2 rounded cursor-pointer">
                    Important Action
                  </YellowAccent>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-navy/50 backdrop-blur-sm p-6 rounded-lg border border-primary-blue/20">
            <h3 className="text-xl font-semibold mb-4 text-primary-blue">Suggested Applications</h3>
            <ul className="text-primary-blue space-y-2">
              <li>• <YellowAccent variant="text">Accent highlights</YellowAccent> - Important buttons or CTAs</li>
              <li>• <YellowAccent variant="text">Success states</YellowAccent> - Form validation, achievements</li>
              <li>• <YellowAccent variant="text">Energy/creativity</YellowAccent> - Personal projects section</li>
              <li>• <YellowAccent variant="text">Warmth</YellowAccent> - Contact section, personal touches</li>
              <li>• <YellowAccent variant="text">Attention</YellowAccent> - Key skills or technologies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 