var player;
var defaultVideoId = 'dXjcvIPSBr4'; //its working its working
function onYouTubeIframeAPIReady() {
    let videoId = getUrlParameter('v');
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoId,
    });
}

function addUrlParameters(){
    let url = new URL(location.href);
    // If your expected result is "http://foo.bar/?x=42&y=2"
    let vid = $('#vid').val();
    let startTime = $('#start').val();
    let clipLength = $('#length').val();
    if (vid === ""){
        vid = defaultVideoId;
        startTime = 0;
        clipLength = -1;
    }
    url.searchParams.set('v', vid);
    url.searchParams.set('t', startTime);
    url.searchParams.set('f', clipLength);
    location.href = url;
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};
var convertToSeconds = function convertToSeconds(timeString){
    let seconds = 0;
    //2h1m34s
    if (timeString === undefined)
    {
        return -1;
    }
    if (timeString.includes('h')){
        seconds += +timeString.split('h')[0] * 60 * 60;
        timeString = timeString.split('h')[1] || "";
    }
    if (timeString.includes('m')){
        seconds += +timeString.split('m')[0] * 60;
        timeString = timeString.split('m')[1] || "";
    }
    if (timeString.includes('s')){
        seconds += +timeString.split('s')[0]
        timeString = timeString.split('s')[1] || "";
    }
    if (timeString !== ""){
        seconds += +timeString;
    }
    return seconds;
}

var playVideo = function playVideo(){
    let videoId = getUrlParameter('v');
    let startSeconds = convertToSeconds(getUrlParameter('t'));
    let endSeconds = convertToSeconds(getUrlParameter('e'));
    let finishSeconds = convertToSeconds(getUrlParameter('f'));
    if (videoId === "" || videoId === undefined){
        videoId = defaultVideoId;
    }
    if (!(startSeconds > -1)){
        startSeconds = 0;
    }
    if (!(endSeconds > -1) ){
        if (!(finishSeconds > -1)){
            endSeconds = 0;
        }
        else{
            endSeconds = startSeconds + finishSeconds;
        }
    }
    player.loadVideoById({videoId: videoId, startSeconds: startSeconds, endSeconds: endSeconds});
    player.playVideo();
}
$('#play').on('click', function() {
    playVideo();
});