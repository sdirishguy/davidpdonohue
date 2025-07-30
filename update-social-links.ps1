# Script to update social links across the entire project
Write-Host "🔄 Starting social links update across the project..." -ForegroundColor Cyan

# Define the replacements
$replacements = @{
    # GitHub replacements - various formats
    'github.com/Donohue76' = 'github.com/sdirishguy'
    'github.com/davidpdonohue' = 'github.com/sdirishguy'
    'www.github.com/Donohue76' = 'www.github.com/sdirishguy'
    'www.github.com/davidpdonohue' = 'www.github.com/sdirishguy'
    'https://github.com/Donohue76' = 'https://github.com/sdirishguy'
    'https://github.com/davidpdonohue' = 'https://github.com/sdirishguy'
    'https://www.github.com/Donohue76' = 'https://www.github.com/sdirishguy'
    'https://www.github.com/davidpdonohue' = 'https://www.github.com/sdirishguy'
    'href="github.com/Donohue76"' = 'href="github.com/sdirishguy"'
    'href="github.com/davidpdonohue"' = 'href="github.com/sdirishguy"'
    'href="https://github.com/Donohue76"' = 'href="https://github.com/sdirishguy"'
    'href="https://github.com/davidpdonohue"' = 'href="https://github.com/sdirishguy"'
    'href="https://www.github.com/Donohue76"' = 'href="https://www.github.com/sdirishguy"'
    'href="https://www.github.com/davidpdonohue"' = 'href="https://www.github.com/sdirishguy"'
    
    # LinkedIn replacements - various formats
    'linkedin.com/in/davidpdonohue' = 'linkedin.com/in/davidpatrickdonohue'
    'www.linkedin.com/in/davidpdonohue' = 'www.linkedin.com/in/davidpatrickdonohue'
    'https://linkedin.com/in/davidpdonohue' = 'https://linkedin.com/in/davidpatrickdonohue'
    'https://www.linkedin.com/in/davidpdonohue' = 'https://www.linkedin.com/in/davidpatrickdonohue'
    'href="linkedin.com/in/davidpdonohue"' = 'href="linkedin.com/in/davidpatrickdonohue"'
    'href="https://linkedin.com/in/davidpdonohue"' = 'href="https://linkedin.com/in/davidpatrickdonohue"'
    'href="https://www.linkedin.com/in/davidpdonohue"' = 'href="https://www.linkedin.com/in/davidpatrickdonohue"'
    
    # Email replacements - various formats
    'donohue76@hotmail.com' = 'david@opfynder.com'
    'mailto:donohue76@hotmail.com' = 'mailto:david@opfynder.com'
    'href="mailto:donohue76@hotmail.com"' = 'href="mailto:david@opfynder.com"'
    'david@davidpdonohue.com' = 'david@opfynder.com'
    'mailto:david@davidpdonohue.com' = 'mailto:david@opfynder.com'
    'href="mailto:david@davidpdonohue.com"' = 'href="mailto:david@opfynder.com"'
}

# File extensions to search
$fileExtensions = @("*.tsx", "*.ts", "*.js", "*.jsx", "*.html", "*.css", "*.json", "*.md")

# Get all files with the specified extensions
$files = Get-ChildItem -Path "src" -Recurse -Include $fileExtensions

$totalFiles = $files.Count
$processedFiles = 0
$updatedFiles = 0

Write-Host "Found $totalFiles files to check." -ForegroundColor Yellow

foreach ($file in $files) {
    $processedFiles++
    $fileContent = Get-Content -Path $file.FullName -Raw
    $fileUpdated = $false
    
    # Progress indicator
    Write-Progress -Activity "Updating Social Links" -Status "Processing file $processedFiles of $totalFiles" -PercentComplete (($processedFiles / $totalFiles) * 100)
    
    # Apply all replacements
    foreach ($pattern in $replacements.Keys) {
        if ($fileContent -match [regex]::Escape($pattern)) {
            $fileContent = $fileContent -replace [regex]::Escape($pattern), $replacements[$pattern]
            $fileUpdated = $true
        }
    }
    
    # Only write to file if changes were made
    if ($fileUpdated) {
        $updatedFiles++
        Set-Content -Path $file.FullName -Value $fileContent -NoNewline
        Write-Host "✅ Updated links in: $($file.FullName)" -ForegroundColor Green
    }
}

Write-Host "`n🎉 Social links update complete!" -ForegroundColor Cyan
Write-Host "Updated $updatedFiles out of $totalFiles files." -ForegroundColor Yellow

# Special check for the HeroSection.tsx file since it's critical
$heroSectionPath = "src/components/sections/HeroSection.tsx"
if (Test-Path $heroSectionPath) {
    $heroContent = Get-Content -Path $heroSectionPath -Raw
    
    # Check if the HeroSection has the correct links
    $hasCorrectGithub = $heroContent -match "github.com/sdirishguy"
    $hasCorrectLinkedIn = $heroContent -match "linkedin.com/in/davidpatrickdonohue"
    $hasCorrectEmail = $heroContent -match "david@opfynder.com"
    
    if (-not ($hasCorrectGithub -and $hasCorrectLinkedIn -and $hasCorrectEmail)) {
        Write-Host "`n⚠️ Warning: HeroSection.tsx might not have all the correct links." -ForegroundColor Yellow
        Write-Host "Please manually verify the social links in this file." -ForegroundColor Yellow
    } else {
        Write-Host "`n✅ HeroSection.tsx has all the correct social links." -ForegroundColor Green
    }
}

Write-Host "`nPlease restart your development server to see the changes." -ForegroundColor Cyan
