/**
 * KWin 6 script: move the active window to a desktop AND switch focus to it.
 * Also supports back and forth to the previously used desktop with Meta+Shift+Z.
 * Ported from nightreveller/kwin-move-window-and-focus-to-desktop (KWin 5 API)
 * to KWin 6 API (workspace.activeWindow, window.desktops, workspace.currentDesktop).
 */

var previousDesktopId = null;

function findDesktopById(id) {
    for (var i = 0; i < workspace.desktops.length; ++i) {
        if (workspace.desktops[i].id === id) {
            return workspace.desktops[i];
        }
    }
    return null;
}

function moveToDesktopAndActivate(desktop) {
    var win = workspace.activeWindow;
    if (!win || !win.moveable || !desktop) {
        return;
    }

    win.desktops = [desktop];
    workspace.currentDesktop = desktop;
    workspace.activeWindow = win;
}

function moveToDesktopNrAndActivate(targetDesktopNr) {
    moveToDesktopAndActivate(workspace.desktops[targetDesktopNr - 1]);
}

function moveToPreviousDesktopAndActivate() {
    if (!previousDesktopId) {
        return;
    }

    var desktop = findDesktopById(previousDesktopId);
    if (!desktop || desktop === workspace.currentDesktop) {
        previousDesktopId = null;
        return;
    }

    moveToDesktopAndActivate(desktop);
}

workspace.currentDesktopChanged.connect(function(previous, current, output) {
    previousDesktopId = previous ? previous.id : null;
});

registerShortcut(
    'MoveWindowAndFocusBackAndForth',
    'Move Window and Focus to Previous Desktop (Back and Forth)',
    'Meta+Shift+Z',
    moveToPreviousDesktopAndActivate
);

// Desktop 1..9 -> Meta+Shift+1..9, Desktop 10 -> Meta+Shift+0.
// The shifted symbols (Meta+!, Meta+@, ...) are what KDE actually stores.
var keys = [
    'Meta+!', 'Meta+@', 'Meta+#', 'Meta+$', 'Meta+%',
    'Meta+^', 'Meta+&', 'Meta+*', 'Meta+(', 'Meta+)'
];

for (var i = 1; i <= 10; i++) {
    (function(n) {
        registerShortcut(
            'MoveWindowAndFocusToDesktop' + n,
            'Move Window and Focus to Desktop ' + n,
            keys[n - 1],
            function() { moveToDesktopNrAndActivate(n); }
        );
    })(i);
}
