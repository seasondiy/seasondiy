# Arabic Fonts for PDF Generation

This directory contains Arabic fonts used for generating PDF reports.

## Required Fonts

For optimal Arabic text rendering in PDF reports, place the following font files in this directory:

### Noto Sans Arabic (Recommended)
- `NotoSansArabic-Regular.ttf`
- `NotoSansArabic-Bold.ttf`

Download from: https://fonts.google.com/noto/specimen/Noto+Sans+Arabic

### Amiri (Alternative)
- `Amiri-Regular.ttf`

Download from: https://fonts.google.com/specimen/Amiri

## Installation Instructions

1. Download the font files from the links above
2. Place them in this directory (`backend/assets/fonts/`)
3. Restart the backend server

## Fallback Behavior

If no Arabic fonts are found, the system will fall back to:
1. System default fonts
2. Helvetica (for Latin text)

## Font Licensing

- **Noto Sans Arabic**: Open Font License (OFL)
- **Amiri**: Open Font License (OFL)

Both fonts are free for commercial and personal use.

## Testing Fonts

After installing fonts, test PDF generation by:

1. Analyzing an image through the API
2. Generating a PDF report
3. Checking that Arabic text renders correctly

## Troubleshooting

If Arabic text appears as boxes or incorrect characters:

1. Verify font files are in the correct directory
2. Check file permissions
3. Restart the backend server
4. Check server logs for font loading errors
