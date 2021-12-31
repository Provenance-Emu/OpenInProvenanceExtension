var handledURL = "";
var isAutomatic = false;

function matchInArray(string, expressions) {
    var len = expressions.length,
        i = 0;

    for (; i < len; i++) {
        if (string.match("." + expressions[i])) {
            return true;
        }
    }

    return false;
};

function runCheck() {
    if (handledURL == window.location.href) {
        // Already handled, don't want to repeat.
        return;
    }

    const extensions = [
        "a26",
        "7z",
        "7zip",
        "a52",
        "bin",
        "ccd",
        "chd",
        "cso",
        "cso",
        "cue",
        "gb",
        "gen",
        "gg",
        "iso",
        "lnx",
        "md",
        "md",
        "n64",
        "nes",
        "ngc",
        "ngp",
        "ngpc",
        "npc",
        "pbp",
        "rar",
        "rom",
        "sfc",
        "sfc",
        "sg",
        "sgx",
        "smc",
        "smd",
        "smd",
        "sms",
        "sms",
        "swc",
        "vb",
        "wad",
        "ws",
        "wsc",
        "z64",
        "zip"
    ];
    const match = matchInArray(window.location.href, extensions);

    if (match) {
        handledURL = window.location.href;
        window.stop();

        const downloadURL = window.location.href;

        if (isAutomatic) {
            window.location.replace(`https://openinprovenance.com?downloadURL=${downloadURL}`);
        } else {
            window.location.replace(`provenance://downloadURL?${downloadURL}`);
        }
    }
}

browser.storage.local.get((item) => {
    var automaticObj = item.automaticObj;

    if (automaticObj == undefined) {
        isAutomatic = true;
    } else {
        isAutomatic = automaticObj.isAutomatic;
    }

    // Run both on extension being created (on page load) as well as when DOM nodes are inserted because some sites do dynamic JavaScript content insertion similar to how AMP operates
    runCheck();
    document.addEventListener("DOMNodeInserted", function(event) {
        runCheck();
    });
})
