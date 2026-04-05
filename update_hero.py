with open('src/components/VoiceHero.tsx', 'r') as f:
    content = f.read()

# Change the positioning of the UNMUTE button container
old_container = '<div className="absolute z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-full mb-8">'
# The active card is 300px wide and aspect-[3/4] on mobile (h=400), and 360px aspect-[3/4] on desktop (h=480).
# Center of the screen is top-1/2, so the top edge of the card is at top-1/2 - 200px (mobile) or -240px (desktop).
# We want the button above the top edge.
new_container = '<div className="absolute z-[60] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[240px] sm:-translate-y-[280px]">'

content = content.replace(old_container, new_container)

with open('src/components/VoiceHero.tsx', 'w') as f:
    f.write(content)
