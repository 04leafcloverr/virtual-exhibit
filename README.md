# CSARCH2 GROUP 1 S40 INCREMENTAL README
This README serves as the incremental development log for our exhibit, Alice Through the Snooping Bus: A Wonderland of Cache Coherence. It documents our original proposal alongside the technical discussions, creative discussions, aha moments, and challenges encountered as development progressed.

## Table of Contents
- [Aha Moments](#aha-moments)
- [Things Learned](#things-learned)
- [Challenges Encountered](#challenges-encountered)
- [Creative Development](#creative-development)
- [Technical Discussions](#technical-discussions)
- [Original Project Proposal](#original-project-proposal)

## Mid-Milestone Development

### Aha Moments
- Realizing that every state transition is crucial to be in the right order and ensuring that both cores know the accurate information.
- Discovered that keeping the "Memory Pocket" to only 1 slot per core made the exhibit clearer, as fewer slots meant users could actually track a Read/Write/Writeback sequence.
- Found innovative approaches/workarounds on the Astro template codes and integrated the project's theme smoothly in the process.

### Things Learned
- Basic Astro project structure.
- How React component state can be used to represent the cache line states (M/E/S/I) and re-render the "Memory Pocket" slots whenever a Read, Write, or Writeback event fires.
- How .mdx files let React components be dropped directly into written content, so the exhibit's narrative and its interactive simulator can live in the same file instead of being wired together separately.

### Challenges Encountered
- Learning Astro while simultaneously planning the exhibit.
- Translating a complex computer architecture topic into an educational exhibit.
- Occurrences when the website layout struggled with issues of unresponsiveness.

### Creative Development
- Refined the original idea by representing CPU cores as Classic Alice and Hysteria Alice, making the cache coherence process easier to visualize. This Alice-in-Wonderland metaphor makes the MESI protocol accessible by mapping hardware states to emotional and psychological states—pure memories become Exclusive, shared recollections become Shared, corrupted memories become Modified, and shattered memories become Invalid.
- Created the 'Rabbit Hole' Writeback Mechanic to demonstrate the cache coherence topic by representing Alice's brain (RAM) as the "subconscious" where memories are permanently stored. When one personality corrupts a memory, it exists only in her conscious mind (cache) while the subconscious or other personality remains unchanged. Similar to how Modified (M) data stays in cache while RAM remains stale. This makes it easier to understand how one personality breaking/modifying a memory can cause confusion and invalidation similar to how MESI states work.
- Designed the Looking-Glass as a Snooping Bus Protocol metaphor, the broadcast medium that connects all cores. When a core performs a memory operation, the bus "reflects" that action to all other cores. This real-time visualization helps users grasp how snooping enables cache coherence without requiring deep hardware knowledge.
- The discussion of different visuals, images from the Alice Game to be integrated into the website aesthetic and tone.
- Changed the colors of the MESI states to better fit the color palette of the game.
- Removed images such as Classic Alice, Hysteria Alice, and the Purple Vortex for a cleaner design.


### Technical Discussions about the topic (Cache Coherence)
- In our initial design, each CPU core had a 3-slot "Memory Pocket" (cache) to represent multiple cache lines. However, we found that this created unnecessary complexity for users trying to understand the core MESI concepts. By simplifying to 1 slot per core, we achieve clearer state transitions, focused learning, and easier visualization. 
- Meanwhile, we kept 5 slots in RAM to provide enough variety of memories for users to experiment with different data items.
- Analysis of how cache snoop broadcasts are simulated between each component.
- Discussion of how the cache's logic will work on code based on the MESI protocol (Remember button (Exclusive), Corrupt button (Modify), Embrace Sanity button (Shared), and Invalid).

---

# Original Project Proposal

---

## Title of Project: 
#Alice Through the Snooping Bus: A Wonderland of Cache Coherence

## Project Theme:
Cache Coherence (MESI Protocol). Our exhibit will explore how multi-core processors communicate to maintain data consistency, using American McGee’s Alice and Alice: Madness Returns video games as a guiding metaphor. <br><br> The core mechanism we wish to explain is the Snooping Bus, which is a broadcast medium where cores announce their memory operations for all processors to observe. In our exhibit, the two “cores” are Classic Alice and Hysteria Alice—two personalities inhabiting the same mind (shared Main Memory). <br><br> When Hysteria Alice corrupts a memory (Write), she broadcasts this corruption across the looking-glass snooping bus. <br> Classic Alice snoops this broadcast and is forced to instantly invalidate her old, happy memory to prevent cognitive dissonance. <br><br>With this simulation, users take on the roles of both personalities, selecting Remember (Read) and Corrupt (Write) commands, and sending shattered memories across the looking-glass snooping bus, triggering real-time MESI state transitions that demonstrate the cost and necessity of cache coherence.

## Group Members:
Adriano, Mark Luis B. <br>
Besa, April Denise B. <br>
Guerrero, Laura Mae D. <br>
Malapitan, Ryan James C. <br>
Pallarca, Cedric S. <br>

## Tech Stack Plan:
**Core Framework:** Astro 6 will be used to build the exhibit page, handle routing, and render the static HTML. <br>
**Environment:** Node.js 26 runs the build process, executes Astro’s development server and manages all npm scripts.<br>
**Content:** Markdown Extended (.mdx) contains the exhibit’s written content, imports and embeds react components using  JSX syntax directly inside the markdown.<br>
**Interactivity:** React 18 will be used for all the interactive elements such as the hotbar, snooping bus animation and button effects.<br>
**Styling:** TailwindCSS or standard CSS styles all UI components with utility classes.<br>

## Proposed Interactive Element:
We will build a React component that visualizes two CPU cores sharing a single block of data in order to demonstrate how the snooping bus keeps the caches synchronized. We can achieve this by setting Alice’s two personalities (Classic Alice and Hysteria Alice) as our CPU cores while her brain becomes the shared RAM which we called the Rabbit Hole which also encapsulates her switching between personalities. <br><br> Features include:
Dual personality hotbar. The screen is split between Classic Alice and Hysteria Alice. Each personality has a 3-slot "Memory Pocket" (cache lines). Slots display items and are colored according to MESI state: Red (Modified/Corrupted), Blue (Exclusive/Pure), Green (Shared/Remembered), or Grey (Invalid/Suppressed). <br><br>
Read (remember) and Write (corrupt) buttons. Remember can recall a memory from the subconscious, while Corrupt can overwrite/modify it. Performing a Corrupt on Hysteria Alice’s side forces a snoop on Classic Alice’s side.<br><br>
The Rabbit Hole Button. A vertical spiraling vortex at the bottom represents Alice's Brain (RAM). When Hysteria Alice corrupts a memory, the conscious mind (cache) is updated, but the deep subconscious remains stale until the user clicks “Embrace Sanity” (Writeback). This sends a purified memory spiraling down to stabilize the core identity.<br>

## Mobile-Responsive Layout:
The layout will use CSS Flexbox/Grid to ensure the exhibit scales down cleanly. On the desktop, the text and interactive simulator will sit side-by-side. On mobile screens (under 768px), the layout will stack vertically, with the interactive simulator pinned to the top of the viewport so users can read the .mdx text while observing the CPU animations.

## Style Guide Snapshot:
<img width="1920" height="1080" alt="1" src="https://github.com/user-attachments/assets/5e25059c-982a-4403-99e6-be77a02c87b2" />
<img width="1920" height="1080" alt="2" src="https://github.com/user-attachments/assets/8a3864aa-57af-40dd-bf09-6dfbfc97770c" />
