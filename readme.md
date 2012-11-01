 LS Static Actor Finder
================
\* version  0.31 beta

***A helper tool to find possible Static Actor errors in .i3d files.***  
___

## FAQ
### What are those so-called static actor errors you keep yapping on about?
There's two kind of static actors. First, the "Singlefacious", more commonly known as The Shakespearean Awesomeness that is Keanu Reeves:

![Keanu Reeves](http://farm1.staticflickr.com/52/106687313_7d633d09fe_m.jpg "A rare sight of the common Singlefacious outside of its usual habitat. Also, he didn't use this tool. Quote: "Fuck that shit!"")

Then, there's the less severe one: the dreaded PhysX error blasting all over your precious log file as if it wants to take it behind middle school and impregnate it.
It looks like this:

`PhysX warning: Static actor moved
(f:\p4sw\sw\legacy\physx\experimental\PhysX_2.8.3\novodex\SDKs\Physics\src\NpActor.cpp:818`

While not really causing any visible errors ingame, it's been said it could maybe definitively sometimes cause performance problems. So far, there's one distinct setup that can cause a static actor error:

1. An object (transform group or object) is scaled.
2. The object has child objects.
3. At least one of those children has a rigid body, is static and is not scaled.

Note: Children objects that have a rigid body, are static ***and are scaled*** do not cause static actor errors.
The number of "PhysX warning" error lines in the log doesn't correlate with the amount of errors. One error could produce fivety-gazillion and three lines in the log if you keep the game running long enough.  
___

### Why should I use your tool?
If you're being serious right now, then you've obviously never looked for static actor error causes in a map. It's very tedious job to do, mostly taking more time than you have on your hands. It's been rumoured that in ancient Rome dissidents and non-willing choir boys were being punished by having to sift through the emperors' awesome maps and find said errors. According to newest researches, 76% died of exhaustion during that task. And ***that***, dear children, is the premier reason you should use the the LS Static Actor Finder. So you won't die. You're welcome.  
___

### How to use the tool?
Although it's pretty self-explanatory, and although there's a fancy ol' picture you could stare at, here's the basic rundown. Again.

1. Open your i3d file with a text editor of your choosing.
2. Copy the scene section (i.e. from `<Scene>` until `<\Scene>`) and paste it in the tool's text area.
3. Uhm, hit that <span style="text-decoration:line-through;">ass</span> button?
4. Enjoy your many marvelous errors. Also, maybe go ahead and fix them.  

___

### I've found some static actor errors in my map. How can I get rid of them?
Congratulations. There's three possible actions to take:

1. Remove the parent's scale (i.e. `ScaleX = 1`, `ScaleY = 1`, `ScaleZ = 1`). But there's a reason it was scaled in the first place, probably to make it look right. So that doesn't always bring the wanted outcome.
2. Change the child's `static="true"`. Brings funny ingame physics with it. There also was a reason that the child was set to static. Again, not preferable.
3. The easiest way (meaning, the one I personally use) is scaling the child [see the note at question 1]. Because I don't really want the looks to change, I only scale it minimally: `ScaleX = 1.000001`, `ScaleY = 1`, `ScaleZ = 4. Ninety-nine percent of the time that suffices.  

___

### Any more information I need to know?
Sure thing.

1. I've tested the tool successfully with Firefox 13.0.1, Chrome 20 and Internet Explorer 9.0.8. Using lower versions or browsers with different engines will induce the *Doomsday Clause*: no success guaranteed. Any higher versions should do just fine. In addition you need active internet access, plus JavaScript must be activated.
2. The bigger the `<Scene>` part, the longer it takes to analyze it, naturally. Huge amounts of data have to be processed. Even if the browser seems to hang or have crashed, don't click everywhere, don't try to close it, just wait. If something went wrong, there will be <span style="text-decoration:line-through;">blood</span> a message.
3. Again: this is not a mod for LS. It's an separate tool for use in the browser.  

___

### Copyright information
Keanu Reeves picture courtesy of [mali mish](http://www.flickr.com/photos/danlin/) at [flickr](http://www.flickr.com/photos/danlin/106687313/) under Creative Commons license BY-NC-ND 2.0.