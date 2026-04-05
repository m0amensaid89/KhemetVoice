import re

with open('src/components/VoiceCarousel.tsx', 'r') as f:
    content = f.read()

# Add isMuted to props
content = content.replace(
    '  disabled?: boolean;\n}',
    '  disabled?: boolean;\n  isMuted?: boolean;\n}'
)

content = content.replace(
    '  disabled = false\n}) => {',
    '  disabled = false,\n  isMuted = false\n}) => {'
)

# Apply muted to audio creation and playing logic
# We need to make sure the audio element is muted
content = content.replace(
    '      if (playingVoice) {',
    '      if (isMuted) audio.muted = true;\n      else audio.muted = false;\n\n      if (playingVoice) {'
)

with open('src/components/VoiceCarousel.tsx', 'w') as f:
    f.write(content)
