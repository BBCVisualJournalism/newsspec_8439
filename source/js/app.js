define(['lib/news_special/bootstrap', 'lib/news_special/share_tools/controller', 'facewall'], function (news, shareTools, Facewall) {

    return {
        init: function () {
            var facewall = new Facewall();
            facewall.init();
        }
    };

});