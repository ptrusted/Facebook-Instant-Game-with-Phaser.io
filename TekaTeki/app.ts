
class TekaTeki {

    // ################################################################################################## Objects.

    game: Phaser.Game;

    MusicMain: Phaser.Sound;
    SfxReset: Phaser.Sound;
    SfxDestroy: Phaser.Sound;
    SfxIn: Phaser.Sound;
    SfxOut: Phaser.Sound;
    SfxSwitch: Phaser.Sound;
    SfxHalfComplete: Phaser.Sound;
    SfxComplete: Phaser.Sound;
    SfxOver: Phaser.Sound;

    Splash: Phaser.Sprite;
    BackgroundMain: Phaser.Sprite;
    Overlay: Phaser.Sprite;
    DialogRank: Phaser.Sprite;
    DialogRules: Phaser.Sprite;
    DialogQuit: Phaser.Sprite;
    DialogGameOver: Phaser.Sprite;
    Icon: Phaser.Sprite;
    BorderLeft: Phaser.Sprite;
    BorderTop: Phaser.Sprite;
    BorderRight: Phaser.Sprite;
    BorderBottom: Phaser.Sprite;
    Board: Phaser.Sprite;
    NodeSelectorTopLeft: Phaser.Sprite;
    NodeSelectorTopRight: Phaser.Sprite;
    NodeSelectorBottomLeft: Phaser.Sprite;
    NodeSelectorBottomRight: Phaser.Sprite;
    NodeSelectorUp: Phaser.Sprite;
    NodeSelectorDown: Phaser.Sprite;
    NodeSelectorLeft: Phaser.Sprite;
    NodeSelectorRight: Phaser.Sprite;
    NodeSelectorCenter: Phaser.Sprite;
    NodeIndicator: Phaser.Sprite;
    TimeoutBase: Phaser.Sprite;
    TimeoutFill: Phaser.Sprite;
    Letters: Array<Phaser.Sprite>;

    ButtonPlay: Phaser.Button;
    ButtonRank: Phaser.Button;
    ButtonRules: Phaser.Button;
    ButtonYes: Phaser.Button;
    ButtonNo: Phaser.Button;
    ButtonQuitGame: Phaser.Button;
    ButtonQuitRank: Phaser.Button;
    ButtonQuitRules: Phaser.Button;

    TheNodes: Phaser.Group;
    NodesDefaultPos: any;
    CurrentNode: any;
    CurrentNodeIndex: any;
    CurrentSelector: any;

    Score: number;
    Highscore: number;
    Timeout: number;
    SaveTime: number;

    CreditsText: Phaser.Text;
    RankText: Phaser.Text;
    ScoreText: Phaser.Text;
    HighscoreText: Phaser.Text;
    ScoreEffectText: Phaser.Text;

    TextStyle1: Phaser.PhaserTextStyle;
    TextStyle2: Phaser.PhaserTextStyle;
    TextStyle3: Phaser.PhaserTextStyle;

    InSplashScreen: boolean;
    InMainMenu: boolean;
    InRankMenu: boolean;
    InRulesMenu: boolean;
    InGameplay: boolean;

    IsReadyToPlay: boolean;
    IsIdle: boolean;
    IsMovingLeft: boolean;
    IsMovingRight: boolean;
    IsMovingUp: boolean;
    IsMovingDown: boolean;

    showMainMenu: Function;
    showGameplay: Function;
    showRank: Function;
    showRules: Function;
    showQuitDialog: Function;
    showGameOverDialog: Function;
    setupGameplay: Function;
    resetNode: Function;
    destroyNode: Function;
    swapNode: Function;
    transformNode: Function;
    matchNode: Function;
    releaseNode: Function;
    distance: Function;
    clamp: Function;
    loadHighscore: Function;
    saveHighscore: Function;

    // ################################################################################################## Main.

    constructor() {
        this.game = new Phaser.Game(480, 800, Phaser.CANVAS, 'Teka Teki', { preload: this.preload, create: this.create, update: this.update });
    }

    preload() {
        this.game.scale.isPortrait = true;
        this.game.scale.parentIsWindow = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        FBInstant.initializeAsync().then(function () { });
        FBInstant.setLoadingProgress(5);
        this.game.load.audio('MainMusic', 'Assets/Sounds/New TekaTeki.ogg');
        this.game.load.audio('SfxReset', 'Assets/Sounds/Reset.ogg');
        this.game.load.audio('SfxDestroy', 'Assets/Sounds/Destroy.ogg');
        this.game.load.audio('SfxIn', 'Assets/Sounds/In.ogg');
        this.game.load.audio('SfxOut', 'Assets/Sounds/Out.ogg');
        this.game.load.audio('SfxSwitch', 'Assets/Sounds/Switch.ogg');
        this.game.load.audio('SfxHalfComplete', 'Assets/Sounds/Half Complete.ogg');
        this.game.load.audio('SfxComplete', 'Assets/Sounds/Complete.ogg');
        this.game.load.audio('SfxOver', 'Assets/Sounds/Over.ogg');
        this.game.load.spritesheet('Splash', 'Assets/Sprites/Splash.png', 200, 200);
        this.game.load.image('BgMain', 'Assets/Sprites/Background Main.png');
        this.game.load.image('Overlay', 'Assets/Sprites/The Overlay.png');
        this.game.load.image('Icon', 'Assets/Sprites/Icon.png');
        this.game.load.image('ButtonPlay', 'Assets/Sprites/Button Play.png');
        this.game.load.image('ButtonRank', 'Assets/Sprites/Button Rank.png');
        this.game.load.image('ButtonRules', 'Assets/Sprites/Button Rules.png');
        this.game.load.image('ButtonQuit', 'Assets/Sprites/Button Quit.png');
        this.game.load.image('ButtonYes', 'Assets/Sprites/Button Yes.png');
        this.game.load.image('ButtonNo', 'Assets/Sprites/Button No.png');
        this.game.load.image('DialogRank', 'Assets/Sprites/Dialog Rank.png');
        this.game.load.image('DialogRules', 'Assets/Sprites/Dialog Rules.png');
        this.game.load.image('DialogQuit', 'Assets/Sprites/Dialog Quit.png');
        this.game.load.image('DialogGameOver', 'Assets/Sprites/Dialog Game Over.png');
        this.game.load.image('BorderLeft', 'Assets/Sprites/The Border Left.png');
        this.game.load.image('BorderTop', 'Assets/Sprites/The Banner Top.png');
        this.game.load.image('BorderRight', 'Assets/Sprites/The Border Right.png');
        this.game.load.image('BorderBottom', 'Assets/Sprites/The Banner Bottom.png');
        this.game.load.image('Board', 'Assets/Sprites/The Board.png');
        this.game.load.image('NodeYellow', 'Assets/Sprites/Node Yellow.png');
        this.game.load.image('NodeGreen', 'Assets/Sprites/Node Green.png');
        this.game.load.image('NodeBlue', 'Assets/Sprites/Node Blue.png');
        this.game.load.image('NSTL', 'Assets/Sprites/NSTL.png');
        this.game.load.image('NSTR', 'Assets/Sprites/NSTR.png');
        this.game.load.image('NSBL', 'Assets/Sprites/NSBL.png');
        this.game.load.image('NSBR', 'Assets/Sprites/NSBR.png');
        this.game.load.image('NSU', 'Assets/Sprites/NSU.png');
        this.game.load.image('NSD', 'Assets/Sprites/NSD.png');
        this.game.load.image('NSL', 'Assets/Sprites/NSL.png');
        this.game.load.image('NSR', 'Assets/Sprites/NSR.png');
        this.game.load.image('NSC', 'Assets/Sprites/NSC.png');
        this.game.load.image('NI', 'Assets/Sprites/Node Indicator.png');
        this.game.load.image('TB', 'Assets/Sprites/Timeout Base.png');
        this.game.load.image('TF', 'Assets/Sprites/Timeout Fill.png');
        this.game.load.image('LA', 'Assets/Sprites/Letter A.png');
        this.game.load.image('LE', 'Assets/Sprites/Letter E.png');
        this.game.load.image('LI', 'Assets/Sprites/Letter I.png');
        this.game.load.image('LK', 'Assets/Sprites/Letter K.png');
        this.game.load.image('LT', 'Assets/Sprites/Letter T.png');
        this.game.load.image('LC', 'Assets/Sprites/Letter Complete.png');
        FBInstant.setLoadingProgress(40);
    }

    create() {
        this.game.stage.backgroundColor = Phaser.Color.WHITE;

        this.MusicMain = this.game.add.audio('MainMusic');
        this.MusicMain.loop = true;

        this.SfxReset = this.game.add.audio('SfxReset');
        this.SfxReset.loop = false;

        this.SfxDestroy = this.game.add.audio('SfxDestroy');
        this.SfxDestroy.loop = false;

        this.SfxIn = this.game.add.audio('SfxIn');
        this.SfxIn.loop = false;

        this.SfxOut = this.game.add.audio('SfxOut');
        this.SfxOut.loop = false;

        this.SfxSwitch = this.game.add.audio('SfxSwitch');
        this.SfxSwitch.loop = false;

        this.SfxHalfComplete = this.game.add.audio('SfxHalfComplete');
        this.SfxHalfComplete.loop = false;

        this.SfxComplete = this.game.add.audio('SfxComplete');
        this.SfxComplete.loop = false;

        this.SfxOver = this.game.add.audio('SfxOver');
        this.SfxOver.loop = false;

        this.BackgroundMain = this.game.add.sprite(0, this.game.height / 2, 'BgMain');
        this.BackgroundMain.anchor.set(0.125, 0.5);

        this.Overlay = this.game.add.sprite(this.game.width / 2, 0, 'Overlay');
        this.Overlay.anchor.set(0.5, 0);

        this.Icon = this.game.add.sprite(this.game.width / 2, 150, 'Icon');
        this.Icon.anchor.setTo(0.5, 0.5);

        this.BorderLeft = this.game.add.sprite(-5, 0, 'BorderLeft');
        this.BorderLeft.anchor.set(0, 0);

        this.BorderTop = this.game.add.sprite(this.game.width / 2, -5, 'BorderTop');
        this.BorderTop.anchor.set(0.5, 0);

        this.BorderRight = this.game.add.sprite(this.game.width + 5, 0, 'BorderRight');
        this.BorderRight.anchor.set(1, 0);

        this.BorderBottom = this.game.add.sprite(this.game.width / 2, this.game.height + 5, 'BorderBottom');
        this.BorderBottom.anchor.set(0.5, 1);

        this.Board = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'Board');
        this.Board.anchor.set(0.5, 0.5);

        this.NodeSelectorTopLeft = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'NSTL');
        this.NodeSelectorTopLeft.anchor.set(0.5, 0.5);
        this.NodeSelectorTopLeft.visible = false;
        this.NodeSelectorTopRight = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'NSTR');
        this.NodeSelectorTopRight.anchor.set(0.5, 0.5);
        this.NodeSelectorTopRight.visible = false;
        this.NodeSelectorBottomLeft = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'NSBL');
        this.NodeSelectorBottomLeft.anchor.set(0.5, 0.5);
        this.NodeSelectorBottomLeft.visible = false;
        this.NodeSelectorBottomRight = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'NSBR');
        this.NodeSelectorBottomRight.anchor.set(0.5, 0.5);
        this.NodeSelectorBottomRight.visible = false;
        this.NodeSelectorUp = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'NSU');
        this.NodeSelectorUp.anchor.set(0.5, 0.5);
        this.NodeSelectorUp.visible = false;
        this.NodeSelectorDown = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'NSD');
        this.NodeSelectorDown.anchor.set(0.5, 0.5);
        this.NodeSelectorDown.visible = false;
        this.NodeSelectorLeft = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'NSL');
        this.NodeSelectorLeft.anchor.set(0.5, 0.5);
        this.NodeSelectorLeft.visible = false;
        this.NodeSelectorRight = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'NSR');
        this.NodeSelectorRight.anchor.set(0.5, 0.5);
        this.NodeSelectorRight.visible = false;
        this.NodeSelectorCenter = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'NSC');
        this.NodeSelectorCenter.anchor.set(0.5, 0.5);
        this.NodeSelectorCenter.visible = false;
        this.NodeIndicator = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'NI');
        this.NodeIndicator.anchor.set(0.5, 0.5);
        this.NodeIndicator.visible = false;

        this.TimeoutBase = this.game.add.sprite((this.game.width / 2) - 67, this.game.height - 15, 'TB');
        this.TimeoutBase.anchor.set(0, 1);

        this.TimeoutFill = this.game.add.sprite((this.game.width / 2) - 67, this.game.height - 15, 'TF');
        this.TimeoutFill.anchor.set(0, 1);

        this.DialogRank = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'DialogRank');
        this.DialogRank.anchor.set(0.5, 0.5);

        this.DialogRules = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'DialogRules');
        this.DialogRules.anchor.set(0.5, 0.5);

        this.DialogQuit = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'DialogQuit');
        this.DialogQuit.anchor.set(0.5, 0.5);

        this.DialogGameOver = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'DialogGameOver');
        this.DialogGameOver.anchor.set(0.5, 0.5);

        this.Letters = [
            this.game.add.sprite((this.game.width / 2) - 148.25, this.game.height - 119, 'LT'),
            this.game.add.sprite((this.game.width / 2) - 111.75, this.game.height - 119, 'LE'),
            this.game.add.sprite((this.game.width / 2) - 76.5, this.game.height - 119, 'LK'),
            this.game.add.sprite((this.game.width / 2) - 40.25, this.game.height - 119, 'LA'),
            this.game.add.sprite((this.game.width / 2) + 26, this.game.height - 119, 'LT'),
            this.game.add.sprite((this.game.width / 2) + 62.75, this.game.height - 119, 'LE'),
            this.game.add.sprite((this.game.width / 2) + 98, this.game.height - 119, 'LK'),
            this.game.add.sprite((this.game.width / 2) + 135, this.game.height - 119, 'LI'),
            this.game.add.sprite((this.game.width / 2) - 202.5895, this.game.height - 132, 'LC')
        ];
        for (var a = 0; a < this.Letters.length; a++)
            this.Letters[a].alpha = 0.0;

        this.ButtonPlay = this.game.add.button(this.game.width / 2, (this.game.height / 2) + 60, 'ButtonPlay');
        this.ButtonPlay.anchor.set(0.5, 0.5);
        this.ButtonPlay.onInputUp.add(TekaTeki.prototype.buttonPlayEvent, this);

        this.ButtonRank = this.game.add.button(this.game.width / 2, (this.game.height / 2) + 160, 'ButtonRank');
        this.ButtonRank.anchor.set(0.5, 0.5);
        this.ButtonRank.onInputUp.add(TekaTeki.prototype.buttonRankEvent, this);

        this.ButtonRules = this.game.add.button(this.game.width / 2, (this.game.height / 2) + 260, 'ButtonRules');
        this.ButtonRules.anchor.set(0.5, 0.5);
        this.ButtonRules.onInputUp.add(TekaTeki.prototype.buttonRulesEvent, this);

        this.ButtonYes = this.game.add.button((this.game.width / 2) - 20, (this.game.height / 2) + 20, 'ButtonYes');
        this.ButtonYes.anchor.set(1.0, 0.5);
        this.ButtonYes.onInputUp.add(TekaTeki.prototype.buttonYesEvent, this);

        this.ButtonNo = this.game.add.button((this.game.width / 2) + 20, (this.game.height / 2) + 20, 'ButtonNo');
        this.ButtonNo.anchor.set(0.0, 0.5);
        this.ButtonNo.onInputUp.add(TekaTeki.prototype.buttonNoEvent, this);

        this.ButtonQuitGame = this.game.add.button(this.game.width / 2 - 91, this.game.height - 15, 'ButtonQuit');
        this.ButtonQuitGame.anchor.set(1, 1);
        this.ButtonQuitGame.onInputUp.add(TekaTeki.prototype.buttonQuitGameEvent, this);

        this.ButtonQuitRank = this.game.add.button(this.game.width / 2, this.game.height - 25, 'ButtonQuit');
        this.ButtonQuitRank.anchor.set(0.5, 1);
        this.ButtonQuitRank.onInputUp.add(TekaTeki.prototype.buttonQuitRankEvent, this);

        this.ButtonQuitRules = this.game.add.button(this.game.width / 2, this.game.height - 25, 'ButtonQuit');
        this.ButtonQuitRules.anchor.set(0.5, 1);
        this.ButtonQuitRules.onInputUp.add(TekaTeki.prototype.buttonQuitRulesEvent, this);

        this.Splash = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'Splash');
        this.Splash.anchor.set(0.5, 0.5);
        this.Splash.animations.add('Splashing');
        this.Splash.animations.getAnimation('Splashing').onComplete.addOnce(TekaTeki.prototype.postSplashEvent, this);

        this.TextStyle1 = { font: "bold 60pt Arial", fill: 'white', align: 'center', wordWrap: false };
        this.TextStyle2 = { font: "bold 20pt Arial", fill: 'white', align: 'center', wordWrap: false };
        this.TextStyle3 = { font: "bold 7pt Arial", fill: 'white', align: 'center', wordWrap: false };

        this.IsReadyToPlay = false;
        this.IsIdle = true;

        this.Score = 0;
        this.Highscore = 0;
        this.Timeout = 30000;
        this.SaveTime = 3000;

        this.CreditsText = this.game.add.text(this.game.width / 2, this.game.height - 3,
            "Developed in Surabaya for my nephew Na'il Ar Rasyid Hanifa.\nCredits to Phaser.io, Audacity, Inkscape, and LMMS.io. Mumbling_Man Games 2018.", this.TextStyle3);
        this.CreditsText.anchor.set(0.5, 1);

        this.RankText = this.game.add.text(this.game.width / 2, this.game.height / 2, "Empty ...", this.TextStyle2);
        this.RankText.anchor.set(0.5, 0.5);

        this.ScoreText = this.game.add.text(this.game.width / 2, 10, this.Score.toString(), this.TextStyle1);
        this.ScoreText.anchor.set(0.5, 0);

        this.HighscoreText = this.game.add.text(this.game.width / 2, this.game.height / 2, this.Highscore.toString(), this.TextStyle1);
        this.HighscoreText.anchor.set(0.5, 1.0);

        this.ScoreEffectText = this.game.add.text(this.game.width / 2, this.game.height - 25, "Bonus :", this.TextStyle2);
        this.ScoreEffectText.anchor.set(0.5, 1.0);
        this.ScoreEffectText.visible = false;

        this.TheNodes = this.game.add.group(this.Board);
        this.NodesDefaultPos = [];

        FBInstant.setLoadingProgress(75);

        this.showMainMenu = function (on: boolean) {
            if (on) {
                this.MusicMain.volume = 1.0;
                this.InMainMenu = true;
                this.BackgroundMain.visible = true;
                this.Overlay.visible = true;
                this.Icon.visible = true;
                this.ButtonPlay.visible = true;
                this.ButtonRank.visible = true;
                this.ButtonRules.visible = true;
                this.Overlay.position.y = -400;
                this.game.add.tween(this.Overlay).to({ y: 0 }, 500, Phaser.Easing.Bounce.Out, true, 0, 0, false);
                this.HighscoreText.visible = true;
                this.CreditsText.visible = true;
            } else {
                this.InMainMenu = false;
                this.BackgroundMain.visible = false;
                this.Overlay.visible = false;
                this.Icon.visible = false;
                this.ButtonPlay.visible = false;
                this.ButtonRank.visible = false;
                this.ButtonRules.visible = false;
                this.HighscoreText.visible = false;
                this.CreditsText.visible = false;
            }
        };
        
        this.showRank = function (on: boolean) {
            if (on) {
                FBInstant.getLeaderboardAsync('The Score Rank')
                    .then(leaderboard => leaderboard.getEntriesAsync(10, 0))
                    .then(entries => {
                        this.RankText.text = "";
                        for (var i = 0; i < entries.length; i++) {
                            this.RankText.text += '('+entries[i].getRank() + '.)\t' + entries[i].getPlayer().getName() + '\t\t' + entries[i].getScore() + '\n';
                        }
                    }).catch(error => console.error(error));
                this.BackgroundMain.visible = true;
                this.InRankMenu = true;
                this.DialogRank.visible = true;
                this.ButtonQuitRank.visible = true;
                this.RankText.visible = true;
                this.DialogRank.position.y = -200;
                this.game.add.tween(this.DialogRank).to({ y: this.game.height / 2 }, 400, Phaser.Easing.Bounce.Out, true, 0, 0, false);
            } else {
                this.BackgroundMain.visible = false;
                this.InRankMenu = false;
                this.DialogRank.visible = false;
                this.RankText.visible = false;
                this.ButtonQuitRank.visible = false;
            }
        };

        this.showRules = function (on: boolean) {
            if (on) {
                this.BackgroundMain.visible = true;
                this.InRulesMenu = true;
                this.DialogRules.visible = true;
                this.ButtonQuitRules.visible = true;
                this.DialogRules.position.y = -200;
                this.game.add.tween(this.DialogRules).to({ y: this.game.height / 2 }, 400, Phaser.Easing.Bounce.Out, true, 0, 0, false);
            } else {
                this.BackgroundMain.visible = false;
                this.InRulesMenu = false;
                this.DialogRules.visible = false;
                this.ButtonQuitRules.visible = false;
            }
        };

        this.showGameplay = function (on: boolean) {
            if (on) {
                this.InGameplay = true;
                this.BackgroundMain.visible = true;
                this.BorderLeft.visible = true;
                this.BorderTop.visible = true;
                this.BorderRight.visible = true;
                this.BorderBottom.visible = true;
                this.Board.visible = true;
                this.BorderLeft.position.x = -50;
                this.game.add.tween(this.BorderLeft).to({ x: -5 }, 250, Phaser.Easing.Bounce.Out, true, 0, 0, false);
                this.BorderTop.position.y = -100;
                this.game.add.tween(this.BorderTop).to({ y: -5 }, 250, Phaser.Easing.Bounce.Out, true, 0, 0, false);
                this.BorderRight.position.x = this.game.width + 50;
                this.game.add.tween(this.BorderRight).to({ x: this.game.width + 5 }, 250, Phaser.Easing.Bounce.Out, true, 0, 0, false);
                this.BorderBottom.position.y = this.game.height + 100;
                this.game.add.tween(this.BorderBottom).to({ y: this.game.height + 5 }, 250, Phaser.Easing.Bounce.Out, true, 0, 0, false);
                this.ScoreText.visible = true;
                this.ButtonQuitGame.visible = true;
                this.TimeoutBase.visible = true;
                this.TimeoutFill.visible = true;
            } else {
                this.InGameplay = false;
                this.BackgroundMain.visible = false;
                this.BorderLeft.visible = false;
                this.BorderTop.visible = false;
                this.BorderRight.visible = false;
                this.BorderBottom.visible = false;
                this.Board.visible = false;
                this.ScoreText.visible = false;
                this.ButtonQuitGame.visible = false;
                this.TimeoutBase.visible = false;
                this.TimeoutFill.visible = false;
                if (this.CurrentSelector != null)
                    this.CurrentSelector.visible = false;
                if (this.NodeIndicator != null)
                    this.NodeIndicator.visible = false;
            }
        };

        this.showQuitDialog = function (on: boolean) {
            if (on) {
                if (this.Score >= this.Highscore)
                    this.saveHighscore(true);
                this.ButtonQuitGame.visible = false;
                this.ButtonYes.visible = true;
                this.ButtonNo.visible = true;
                this.DialogQuit.visible = true;
                this.DialogQuit.position.y = -400;
                this.game.add.tween(this.DialogQuit).to({ y: this.game.height / 2 }, 500, Phaser.Easing.Bounce.Out, true, 0, 0, false);
            } else {
                this.ButtonQuitGame.visible = true;
                this.ButtonYes.visible = false;
                this.ButtonNo.visible = false;
                this.DialogQuit.visible = false;
            }
        };

        this.showGameOverDialog = function (on: boolean) {
            if (on) {
                if (this.Score >= this.Highscore)
                    this.saveHighscore(true);
                this.MusicMain.volume = 0.15;
                this.SfxOver.play();
                this.ButtonQuitGame.visible = false;
                this.ButtonYes.visible = true;
                this.ButtonNo.visible = true;
                this.DialogGameOver.visible = true;
                this.DialogGameOver.position.y = -400;
                this.game.add.tween(this.DialogGameOver).to({ y: this.game.height / 2 }, 500, Phaser.Easing.Bounce.Out, true, 0, 0, false);
            } else {
                this.ButtonQuitGame.visible = true;
                this.ButtonYes.visible = false;
                this.ButtonNo.visible = false;
                this.DialogGameOver.visible = false;
            }
        };

        this.setupGameplay = function () {
            this.MusicMain.volume = 0.65;
            this.Score = 0;
            this.Timeout = 30000;
            this.SaveTime = 3000;
            this.IsReadyToPlay = false;
            this.IsIdle = true;
            for (var a = 0; a < this.TheNodes.length; a++) {
                this.game.time.events.add(25 + (a * 25), this.resetNode, this, this.TheNodes.children[a], true, this.TheNodes.children[a].x / this.game.width * 300, this.NodesDefaultPos[a].x, this.NodesDefaultPos[a].y);
            }
            this.game.time.events.add(1500, function () {
                this.IsReadyToPlay = true;
                this.IsMovingUp = this.IsMovingDown = this.IsMovingLeft = this.IsMovingRight = false;
            }, this);
        };
        
        this.loadHighscore = function () {
            FBInstant.getLeaderboardAsync('The Score Rank')
                .then(leaderboard => leaderboard.getPlayerEntryAsync())
                .then(entry => {
                    this.Highscore = entry.getScore();
                    this.HighscoreText.text = this.Highscore;
                    console.log(
                    entry.getRank() + '. ' +
                        entry.getPlayer().getName() + ': ' +
                        entry.getScore()
                    );
                })
                .catch(error => console.error(error));
        };

        this.saveHighscore = function (upload: boolean) {
            this.Highscore = this.Score;
            this.HighscoreText.text = this.Highscore.toString();
            if (upload) {
                FBInstant.getLeaderboardAsync('The Score Rank')
                    .then(leaderboard => {
                        console.log(leaderboard.getName());
                        this.Highscore = Math.round(this.Highscore);
                        this.HighscoreText.text = this.Highscore.toString();
                        return leaderboard.setScoreAsync(this.Highscore, '');
                    })
                    .then(() => console.log('Score saved'))
                    .catch(error => console.error(error));
            }
        };

        this.clamp = function (input, max): number {
            if (input > max)
                return max;
            else
                return input;
        };

        this.resetNode = function (node, sfxOn, delay, posX, posY) {
            node.color = this.game.rnd.integerInRange(0, 2);
            switch (node.color) {
                case 0:
                    node.loadTexture("NodeYellow");
                    break;
                case 1:
                    node.loadTexture("NodeGreen");
                    break;
                case 2:
                    node.loadTexture("NodeBlue");
                    break;
            }
            node.position.x = posX;
            node.position.y = posY;
            node.scale.x = 2;
            node.scale.y = 2;
            this.game.add.tween(node.scale).to({ x: 1, y: 1 }, 500, Phaser.Easing.Bounce.Out, true, delay, 0, false);
            if (sfxOn)
                this.SfxReset.play();
        };

        this.destroyNode = function (node, time) {
            node.scale.x = 1.5;
            node.scale.y = 1.5;
            node.color = -1;
            var temp1 = this.game.rnd.integerInRange(0, 1);
            var temp2 = this.game.rnd.realInRange(-1.0, 1.0);
            if (temp1 == 0)
                temp1 = -2;
            else
                temp1 = 2;
            this.game.add.tween(node.position).to({ x: temp1 * this.game.width / 3, y: temp2 * this.game.height / 2 }, time, Phaser.Easing.Default, true, 0, 0, false);
        };

        this.swapNode = function () {
            var temp = this.CurrentNode[1].color;
            switch (this.CurrentNode[0].color) {
                case 0:
                    this.CurrentNode[1].loadTexture("NodeYellow");
                    break;
                case 1:
                    this.CurrentNode[1].loadTexture("NodeGreen");
                    break;
                case 2:
                    this.CurrentNode[1].loadTexture("NodeBlue");
                    break;
            }
            this.CurrentNode[1].color = this.CurrentNode[0].color;
            this.CurrentNode[0].color = temp;
            switch (temp) {
                case 0:
                    this.CurrentNode[0].loadTexture("NodeYellow");
                    break;
                case 1:
                    this.CurrentNode[0].loadTexture("NodeGreen");
                    break;
                case 2:
                    this.CurrentNode[0].loadTexture("NodeBlue");
                    break;
            }
            temp = { x: this.NodesDefaultPos[this.CurrentNodeIndex[0]].x, y: this.NodesDefaultPos[this.CurrentNodeIndex[0]].y };
            this.CurrentNode[0].x = this.NodesDefaultPos[this.CurrentNodeIndex[1]].x;
            this.CurrentNode[0].y = this.NodesDefaultPos[this.CurrentNodeIndex[1]].y;
            this.CurrentNode[1].x = temp.x;
            this.CurrentNode[1].y = temp.y;

            this.game.add.tween(this.CurrentNode[0].position).to({ x: this.NodesDefaultPos[this.CurrentNodeIndex[0]].x, y: this.NodesDefaultPos[this.CurrentNodeIndex[0]].y }, 75, Phaser.Easing.Default, true, 0, 0, false);
            this.game.add.tween(this.CurrentNode[1].position).to({ x: this.NodesDefaultPos[this.CurrentNodeIndex[1]].x, y: this.NodesDefaultPos[this.CurrentNodeIndex[1]].y }, 75, Phaser.Easing.Default, true, 0, 0, false);
        };

        this.transformNode = function () {
            this.game.time.events.add(250, function () {
                if (this.CurrentNode[0].color < 2)
                    this.CurrentNode[0].color++;
                else
                    this.CurrentNode[0].color = 0;
                switch (this.CurrentNode[0].color) {
                    case 0:
                        this.CurrentNode[0].loadTexture("NodeYellow");
                        break;
                    case 1:
                        this.CurrentNode[0].loadTexture("NodeGreen");
                        break;
                    case 2:
                        this.CurrentNode[0].loadTexture("NodeBlue");
                        break;
                }
                if (this.CurrentNode[1].color < 2)
                    this.CurrentNode[1].color++;
                else
                    this.CurrentNode[1].color = 0;
                switch (this.CurrentNode[1].color) {
                    case 0:
                        this.CurrentNode[1].loadTexture("NodeYellow");
                        break;
                    case 1:
                        this.CurrentNode[1].loadTexture("NodeGreen");
                        break;
                    case 2:
                        this.CurrentNode[1].loadTexture("NodeBlue");
                        break;
                }
                this.CurrentNode[0].scale.x = 2;
                this.CurrentNode[0].scale.y = 2;
                this.CurrentNode[1].scale.x = 2;
                this.CurrentNode[1].scale.y = 2;
                this.game.add.tween(this.CurrentNode[0].scale).to({ x: 1, y: 1 }, 75, Phaser.Easing.Bounce.Out, true, 0, 0, false);
                this.game.add.tween(this.CurrentNode[1].scale).to({ x: 1, y: 1 }, 75, Phaser.Easing.Bounce.Out, true, 0, 0, false);
            }, this);
        };

        this.matchNode = function () {
            this.game.time.events.add(500, function () {
                var scoreCounter = 0;
                var matched = false;
                for (var n = 0; n < 2; n++) {
                    var currentCheck = this.CurrentNodeIndex[n];

                    var reachEndLeft = false;
                    var reachEndRight = false;
                    var reachEndUp = false;
                    var reachEndDown = false;

                    var horizontalCounter = 0;
                    var verticalCounter = 0;
                    var horizontalMatch = [this.CurrentNodeIndex[n], 0, 0, 0, 0, 0, 0];
                    var verticalMatch = [this.CurrentNodeIndex[n], 0, 0, 0, 0, 0, 0, 0, 0];
                    for (var h = 0; h < 6; h++) {
                        if (!reachEndLeft) {
                            if (currentCheck % 6 < 1) {
                                currentCheck = this.CurrentNodeIndex[n];
                                reachEndLeft = true;
                            } else {
                                currentCheck = currentCheck - 1;
                                if (this.TheNodes.children[currentCheck].color == this.CurrentNode[n].color) {
                                    horizontalCounter = horizontalCounter + 1;
                                    horizontalMatch[horizontalCounter] = currentCheck;
                                } else {
                                    reachEndLeft = true;
                                    currentCheck = this.CurrentNodeIndex[n];
                                }
                            }
                        } else if (!reachEndRight) {
                            if (currentCheck % 6 > 4) {
                                currentCheck = this.CurrentNodeIndex[n];
                                reachEndRight = true;
                            } else {
                                currentCheck = currentCheck + 1;
                                if (this.TheNodes.children[currentCheck].color == this.CurrentNode[n].color) {
                                    horizontalCounter = horizontalCounter + 1;
                                    horizontalMatch[horizontalCounter] = currentCheck;
                                } else {
                                    reachEndRight = true;
                                    currentCheck = this.CurrentNodeIndex[n];
                                }
                            }
                        } else
                            break;
                    }
                    for (var v = 0; v < 8; v++) {
                        if (!reachEndUp) {
                            if (currentCheck < 6) {
                                currentCheck = this.CurrentNodeIndex[n];
                                reachEndUp = true;
                            } else {
                                currentCheck = currentCheck - 6;
                                if (this.TheNodes.children[currentCheck].color == this.CurrentNode[n].color) {
                                    verticalCounter = verticalCounter + 1;
                                    verticalMatch[verticalCounter] = currentCheck;
                                } else {
                                    reachEndUp = true;
                                    currentCheck = this.CurrentNodeIndex[n];
                                }
                            }
                        } else if (!reachEndDown) {
                            if (currentCheck > 41) {
                                currentCheck = this.CurrentNodeIndex[n];
                                reachEndDown = true;
                            } else {
                                currentCheck = currentCheck + 6;
                                if (this.TheNodes.children[currentCheck].color == this.CurrentNode[n].color) {
                                    verticalCounter = verticalCounter + 1;
                                    verticalMatch[verticalCounter] = currentCheck;
                                } else {
                                    reachEndDown = true;
                                    currentCheck = this.CurrentNodeIndex[n];
                                }
                            }
                        } else
                            break;
                    }
                    if (horizontalCounter > 1) {
                        this.SfxDestroy.play();
                        matched = true;
                        for (var hd = 0; hd <= horizontalCounter; hd++) {
                            if (this.TheNodes.children[horizontalMatch[hd]].color > -1) {
                                scoreCounter = scoreCounter + 10;
                                this.destroyNode(this.TheNodes.children[horizontalMatch[hd]], 100);
                            }
                        }
                    }
                    if (verticalCounter > 1) {
                        this.SfxDestroy.play();
                        matched = true;
                        for (var vd = 0; vd <= verticalCounter; vd++) {
                            if (this.TheNodes.children[verticalMatch[vd]].color > -1) {
                                scoreCounter = scoreCounter + 10;
                                this.destroyNode(this.TheNodes.children[verticalMatch[vd]], 100);
                            }
                        }
                    }
                }
                if (matched) {
                    this.Score = this.Score + scoreCounter;

                    var bonus = 0;
                    if (scoreCounter > 30) {
                        if (scoreCounter < 80) {
                            bonus = (scoreCounter / 40) * 25;
                            this.SfxHalfComplete.play();
                        } else {
                            bonus = (scoreCounter / 80) * 100;
                            this.SfxComplete.play();
                        }
                    }

                    for (var a = 0; a < this.clamp(scoreCounter / 10, 9); a++) {
                        this.Letters[a].alpha = 1.0;
                        this.game.add.tween(this.Letters[a]).to({ alpha: 0.0 }, 250, Phaser.Easing.Default, true, 1000, 0, false);
                    }

                    this.ScoreEffectText.visible = true;
                    this.ScoreEffectText.text = scoreCounter.toString() + "\nBonus " + bonus.toString();
                    this.ScoreEffectText.position.x = this.CurrentNode[0].worldPosition.x;
                    this.ScoreEffectText.position.y = this.CurrentNode[0].worldPosition.y;
                    this.game.add.tween(this.ScoreEffectText.position).to({ y: -50 }, 1000, Phaser.Easing.Default, true, 0, 0, false);

                    this.Score = this.Score + bonus;
                    if (this.Score > this.Highscore)
                        this.saveHighscore(false);
                }
            }, this);
        };

        this.releaseNode = function () {
            if (this.IsReadyToPlay) {
                this.MusicMain.volume = 0.15;
                this.IsReadyToPlay = false;
                this.IsIdle = false;
                this.CurrentSelector.visible = false;
                this.NodeIndicator.visible = false;

                if (this.CurrentNode[0] != null && this.CurrentNode[1] != null) {
                    this.SfxSwitch.play();
                    this.swapNode();
                    this.transformNode();
                    this.matchNode();
                    this.game.time.events.add(1000, function () {
                        this.IsReadyToPlay = true;
                        this.IsIdle = true;
                        this.CurrentNode[0] = null;
                        this.CurrentSelector = null;
                        this.MusicMain.volume = 0.65;
                        var b = 1;
                        var c = false;
                        for (var a = 0; a < this.TheNodes.length; a++) {
                            if (this.TheNodes.children[a].color < 0) {
                                this.resetNode(this.TheNodes.children[a], true, b * 50, this.NodesDefaultPos[a].x, this.NodesDefaultPos[a].y);
                                this.Timeout = this.Timeout + 250;
                                if (this.Timeout > 30000)
                                    this.Timeout = 30000;
                                b = b + 1;
                                c = true;
                            }
                        }
                        if (c) {
                            this.TimeoutFill.alpha = 0.2;
                            this.game.add.tween(this.TimeoutFill).to({ alpha: 1.0 }, 200, Phaser.Easing.Bounce.Out, true, 0, 0, false);
                        }
                    }, this);
                } else {
                    this.MusicMain.volume = 0.65;
                    this.SfxOut.play();
                    this.IsReadyToPlay = true;
                    this.IsIdle = true;
                    this.CurrentNode[0] = null;
                    this.CurrentSelector = null;
                }
            }
        };

        this.distance = function (x1: number, y1: number, x2: number, y2: number): number {
            return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        };

        this.CurrentNode = [null, null];
        this.CurrentNodeIndex = [0, 0];
        this.CurrentSelector = null;
        var c = 0;
        for (var b = 1; b < 9; b++) {
            for (var a = 1; a < 7; a++) {
                var node = this.game.make.button(
                    - (this.Board.width / 2) - (this.Board.width / 12) + (a * this.Board.width / 6),
                    - (this.Board.height / 2) - (this.Board.height / 16) + (b * this.Board.height / 8),
                    "NodeYellow");
                node.anchor.set(0.5, 0.5);
                node.name = c.toString();
                node.inputEnabled = true;
                node.onInputDown.add(TekaTeki.prototype.nodeSelect, this);
                this.NodesDefaultPos[c] = { x: node.position.x, y: node.position.y };
                this.resetNode(node, false);
                this.TheNodes.add(node);
                c++;
            }
        }

        this.showRank(false);
        this.showRules(false);
        this.showQuitDialog(false);
        this.showGameOverDialog(false);
        this.showGameplay(false);
        this.showMainMenu(false);

        this.Splash.animations.play('Splashing', 15, false);
        this.InSplashScreen = true;
        FBInstant.setLoadingProgress(100);
        FBInstant.startGameAsync().then(function () { });
    }

    update() {
        if (this.InMainMenu) {
            this.Icon.position.y = 150 + (Math.sin(this.game.time.totalElapsedSeconds() * 1.25) * 15);
            this.Icon.angle = Math.sin(this.game.time.totalElapsedSeconds() / 1.5) * 10;
        }
        if (this.InGameplay) {
            this.ScoreText.text = this.Score.toString();
            if (this.IsIdle) {
                for (var a = 0; a < this.TheNodes.length; a++)
                    this.TheNodes.children[a].position.y = this.NodesDefaultPos[a].y + (Math.sin(this.game.time.totalElapsedSeconds() * 3 + (this.NodesDefaultPos[a].x / this.game.width)) * 5);
                if (this.Timeout < 0) {
                    this.showGameOverDialog(true);
                    this.IsIdle = false;
                    this.IsReadyToPlay = false;
                } else
                    this.Timeout = this.Timeout - this.game.time.elapsedMS;
                this.TimeoutFill.scale.x = this.Timeout / 30000;
            } else {
                if (this.SaveTime < 0) {
                    if (this.Score >= this.Highscore)
                        this.saveHighscore(true);
                    this.SaveTime = 3000;
                } else
                    this.SaveTime = this.SaveTime - this.game.time.elapsedMS;
            }
            if (this.IsReadyToPlay && this.CurrentNode[0] != null) {
                var dstnc = this.distance(this.CurrentNode[0].worldPosition.x, this.CurrentNode[0].worldPosition.y, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY);
                if (dstnc > 27.5) {
                    if (Math.abs(this.CurrentNode[0].worldPosition.y - this.game.input.activePointer.worldY) < 37.5) {
                        this.NodeIndicator.visible = true;
                        if (this.game.input.activePointer.worldX > this.CurrentNode[0].worldPosition.x && this.CurrentNodeIndex[0] < this.TheNodes.length - 1 && (this.CurrentNodeIndex[0] + 1) % 6 != 0) {
                            this.IsMovingRight = true;
                            this.CurrentNodeIndex[1] = this.CurrentNodeIndex[0] + 1;
                            this.CurrentNode[1] = this.TheNodes.children[this.CurrentNodeIndex[1]];
                            this.game.add.tween(this.NodeIndicator.position).to({ x: this.CurrentNode[1].worldPosition.x, y: this.CurrentNode[1].worldPosition.y }, 50, Phaser.Easing.Default, true, 0, 0, false);
                        } else if (this.game.input.activePointer.worldX < this.CurrentNode[0].worldPosition.x && this.CurrentNodeIndex[0] > 0 && (this.CurrentNodeIndex[0] + 1) % 6 != 1) {
                            this.IsMovingLeft = true;
                            this.CurrentNodeIndex[1] = this.CurrentNodeIndex[0] - 1;
                            this.CurrentNode[1] = this.TheNodes.children[this.CurrentNodeIndex[1]];
                            this.game.add.tween(this.NodeIndicator.position).to({ x: this.CurrentNode[1].worldPosition.x, y: this.CurrentNode[1].worldPosition.y }, 50, Phaser.Easing.Default, true, 0, 0, false);
                        } else {
                            this.CurrentNodeIndex[1] = 0;
                            this.CurrentNode[1] = null;
                            this.NodeIndicator.visible = this.IsMovingLeft = this.IsMovingRight = false;
                        }
                    } else if (Math.abs(this.CurrentNode[0].worldPosition.x - this.game.input.activePointer.worldX) < 37.5) {
                        this.NodeIndicator.visible = true;
                        if (this.game.input.activePointer.worldY < this.CurrentNode[0].worldPosition.y && this.CurrentNodeIndex[0] > 5) {
                            this.IsMovingUp = true;
                            this.CurrentNodeIndex[1] = this.CurrentNodeIndex[0] - 6;
                            this.CurrentNode[1] = this.TheNodes.children[this.CurrentNodeIndex[1]];
                            this.game.add.tween(this.NodeIndicator.position).to({ x: this.CurrentNode[1].worldPosition.x, y: this.CurrentNode[1].worldPosition.y }, 50, Phaser.Easing.Default, true, 0, 0, false);
                        } else if (this.game.input.activePointer.worldY > this.CurrentNode[0].worldPosition.y && this.CurrentNodeIndex[0] < 42) {
                            this.IsMovingDown = true;
                            this.CurrentNodeIndex[1] = this.CurrentNodeIndex[0] + 6;
                            this.CurrentNode[1] = this.TheNodes.children[this.CurrentNodeIndex[1]];
                            this.game.add.tween(this.NodeIndicator.position).to({ x: this.CurrentNode[1].worldPosition.x, y: this.CurrentNode[1].worldPosition.y }, 50, Phaser.Easing.Default, true, 0, 0, false);
                        } else {
                            this.CurrentNodeIndex[1] = 0;
                            this.CurrentNode[1] = null;
                            this.NodeIndicator.visible = this.IsMovingUp = this.IsMovingDown = false;
                        }
                    }
                } else {
                    this.CurrentNodeIndex[1] = 0;
                    this.CurrentNode[1] = null;
                    this.NodeIndicator.visible = this.IsMovingUp = this.IsMovingDown = this.IsMovingLeft = this.IsMovingRight = false;
                }
                if (this.game.input.activePointer.isUp)
                    this.releaseNode();
            }
        }
    }

    // ################################################################################################## Others.

    postSplashEvent() {
        this.Splash.visible = false;
        this.InSplashScreen = false;
        this.showMainMenu(true);
        this.MusicMain.play();
        this.loadHighscore();
        this.game.add.tween(this.BackgroundMain.position).to({ x: -200 }, 10000, Phaser.Easing.Default, true, 0, 10000, true);
        this.game.add.tween(this.ButtonPlay.scale).to({ x: 0.9, y: 0.9 }, 1000, Phaser.Easing.Default, true, 0, 10000, true);
        this.game.add.tween(this.ButtonRank.scale).to({ x: 0.9, y: 0.9 }, 1000, Phaser.Easing.Default, true, 0, 10000, true);
        this.game.add.tween(this.ButtonRules.scale).to({ x: 0.9, y: 0.9 }, 1000, Phaser.Easing.Default, true, 0, 10000, true);
    }

    buttonPlayEvent() {
        this.SfxIn.play();
        this.setupGameplay();
        this.showMainMenu(false);
        this.showGameplay(true);
    }

    buttonRankEvent() {
        this.SfxIn.play();
        this.showMainMenu(false);
        this.showRank(true);
    }

    buttonRulesEvent() {
        this.SfxIn.play();
        this.showMainMenu(false);
        this.showRules(true);
    }

    buttonQuitRankEvent() {
        this.SfxOut.play();
        this.showRank(false);
        this.showMainMenu(true);
    }

    buttonQuitRulesEvent() {
        this.SfxOut.play();
        this.showRules(false);
        this.showMainMenu(true);
    }

    buttonQuitGameEvent() {
        if (this.IsIdle && this.IsReadyToPlay) {
            this.SfxOut.play();
            this.showQuitDialog(true);
            this.IsIdle = false;
            this.IsReadyToPlay = false;
        }
    }

    buttonYesEvent() {
        this.SfxIn.play();
        if (this.Timeout < 0) {
            this.showGameOverDialog(false);
            this.setupGameplay();
        } else {
            this.showQuitDialog(false);
            this.showGameplay(false);
            this.showMainMenu(true);
        }
    }

    buttonNoEvent() {
        this.SfxOut.play();
        if (this.Timeout < 0) {
            this.showGameOverDialog(false);
            this.showGameplay(false);
            this.showMainMenu(true);
        } else {
            this.showQuitDialog(false);
            this.IsIdle = true;
            this.IsReadyToPlay = true;
        }
    }

    nodeSelect(node) {
        if (this.IsReadyToPlay) {
            this.SfxIn.play();
            this.CurrentNode[0] = node;
            if (node.name == "0") {
                this.CurrentSelector = this.NodeSelectorTopLeft;
                this.NodeSelectorTopLeft.visible = true;
            } else if (node.name == "5") {
                this.CurrentSelector = this.NodeSelectorTopRight;
                this.NodeSelectorTopRight.visible = true;
            } else if (node.name == "42") {
                this.CurrentSelector = this.NodeSelectorBottomLeft;
                this.NodeSelectorBottomLeft.visible = true;
            } else if (node.name == "47") {
                this.CurrentSelector = this.NodeSelectorBottomRight;
                this.NodeSelectorBottomRight.visible = true;
            } else if (node.name == "1" || node.name == "2" || node.name == "3" || node.name == "4") {
                this.CurrentSelector = this.NodeSelectorUp;
                this.NodeSelectorUp.visible = true;
            } else if (node.name == "43" || node.name == "44" || node.name == "45" || node.name == "46") {
                this.CurrentSelector = this.NodeSelectorDown;
                this.NodeSelectorDown.visible = true;
            } else if (node.name == "6" || node.name == "12" || node.name == "18" || node.name == "24" || node.name == "30" || node.name == "36") {
                this.CurrentSelector = this.NodeSelectorLeft;
                this.NodeSelectorLeft.visible = true;
            } else if (node.name == "11" || node.name == "17" || node.name == "23" || node.name == "29" || node.name == "35" || node.name == "41") {
                this.CurrentSelector = this.NodeSelectorRight;
                this.NodeSelectorRight.visible = true;
            } else {
                this.CurrentSelector = this.NodeSelectorCenter;
                this.NodeSelectorCenter.visible = true;
            }
            this.CurrentSelector.position.x = node.worldPosition.x;
            this.CurrentSelector.position.y = node.worldPosition.y;
            this.NodeIndicator.position.x = node.worldPosition.x;
            this.NodeIndicator.position.y = node.worldPosition.y;
            this.CurrentNodeIndex[0] = parseInt(node.name);
        }
    }
}

window.onload = () => {
    var game = new TekaTeki();
};