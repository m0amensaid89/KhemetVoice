import re

with open('src/components/VoiceCarousel.tsx', 'r') as f:
    content = f.read()

# Add isMuted to dependency array so it triggers playback on unmute
content = content.replace(
    '}, [playingVoice, voices]);',
    '}, [playingVoice, voices, isMuted]);'
)

with open('src/components/VoiceCarousel.tsx', 'w') as f:
    f.write(content)
