 const ap = new APlayer({
   container: document.getElementById("aplayer"),
   fixed: true,
   autoplay: true,
   theme: "#000",
   mutex: true,
   lrcType: 1,
   audio: [
     {
       name: "哪里都是你",
       artist: "队长",
       url: "http://music.163.com/song/media/outer/url?id=488249475.mp3",
       cover:
         "http://p1.music.126.net/Ieq9StJjPVyRPlmeOanldQ==/109951166470091750.jpg?param=180y180",
       lrc: "[00:00.000] 作词 : 队长\n[00:01.000] 作曲 : 队长/박수석/김문철",
     }
   ]
 })