Game.AddOption("Load Steam Workshop Mods?", "Manually installed mods will always be loaded, this option provides support for Steam Workshop Mods. Some mods may break the handler/game.", "WorkshopSupport", ["No","Yes"]);
//Game.DirSymlinkExclusions = [];
Game.FileSymlinkExclusions = [ 
	"steam_api64.dll"
];
Game.ExecutableContext = ["data_sts2_windows_x86_64"];
Game.FileSymlinkCopyInstead = [];
Game.GameName = "Slay The Spire 2";
Game.HandlerInterval = 100;
Game.SymlinkExe = true;
Game.SymlinkGame = true;
Game.SymlinkFolders = false;
Game.ExecutableName = "SlayTheSpire2.exe";
Game.SteamID = "2868840";
Game.GUID = "Slay The Spire 2";
Game.MaxPlayers = 4;
Game.MaxPlayersOneMonitor = 4;
Game.UseNucleusEnvironment = true;
Game.Hook.ForceFocus = true;
Game.Hook.ForceFocusWindowName = "Slay the Spire 2";
Game.HasDynamicWindowTitle = true;
Game.RefreshWindowAfterStart = false;
Game.ResetWindows = false;
Game.SetForegroundWindowElsewhere = true;
Game.UserProfileSavePath = "AppData\\Roaming\\GSE Saves\\2868840";
Game.UserProfileSavePathNoCopy = true;
Game.UserProfileConfigPathNoCopy = true;
Game.Description =
  "Wait for all players to load in, then lock inputs. One player hosts a multiplayer game, and others should be able to join the lobby. Audio is muted for all but the main player, sound effects for all players are heard through the main player.\nMouse support has been updated and should function correctly.\nSave files are located in C:\\Users\\<yourusername>\\NucleusCoop\\AppData\\Roaming\\SlayTheSpire2\\steam\\<steamid>. Check your Nucleus player settings to determine which steamid is for which player.\nModded saves and unmodded saves are separated by the game. There are mods to bypass this.\nHave fun slaying the spire!";
Game.PauseBetweenContextAndLaunch = 5;
Game.PauseBetweenProcessGrab = 2;
Game.PauseBetweenStarts = 30;
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;
Game.HideTaskbar = false;
Game.Hook.FixResolution = true;

//USS deprecated options:

Game.HookSetCursorPos = false;
Game.HookGetCursorPos = false;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;

Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.HookReRegisterRawInput = false;
Game.HookReRegisterRawInputMouse = false;
Game.HookReRegisterRawInputKeyboard = false;
Game.DrawFakeMouseCursor = false;

//ProtoInput:

Game.SupportsMultipleKeyboardsAndMice = true;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = false;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.RenameHandlesHook = false;
Game.ProtoInput.RenameHandles = [];
Game.ProtoInput.RenameNamedPipes = [];

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;
Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = false;
Game.ProtoInput.GetKeyboardStateHook = false;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;
Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.ClipCursorHookCreatesFakeClip = true;
Game.ProtoInput.EnableToggleFakeCursorVisibilityShortcut = false;
Game.ProtoInput.DontShowCursorWhenImageUpdated = false;

Game.ProtoInput.RawInputFilter = false;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = false;
Game.ProtoInput.WindowActivateFilter = false;
Game.ProtoInput.WindowActvateAppFilter = false;
Game.ProtoInput.MouseWheelFilter = false;
Game.ProtoInput.MouseButtonFilter = false;
Game.ProtoInput.KeyboardButtonFilter = false;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = false;

Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 40000;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
Game.ProtoInput.BlockedMessages = [0x0008]; //Blocks WM_KILLFOCUS, WM_MOUSEHOVER and WM_MOUSELEAVE.

Game.Play = function() {

  var SW = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\data_sts2_windows_x86_64";

  Context.CopyFolder(Context.ScriptFolder, Context.GetFolder(Nucleus.Folder.InstancedGameFolder));
  
  var savePath = SW + "\\steam_settings\\configs.user.ini";
  Context.ModifySaveFile(savePath, savePath, Nucleus.SaveType.INI, [
    new Nucleus.IniSaveInfo("user::general", "account_name", Context.Nickname),
    new Nucleus.IniSaveInfo("user::general", "account_steamid", Context.PlayerSteamID),
    new Nucleus.IniSaveInfo("user::general", "language", Context.SteamLang)
  ]);
  
  
  var playerFolder = Context.EnvironmentPlayer + "\\AppData\\Roaming\\SlayTheSpire2\\steam\\" + Context.PlayerSteamID;
  var settingsFile = playerFolder + "\\settings.save";

  //If workshop mods are used, symlink the mods into the game directory.
  var modsDestination = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\mods";
  var modsSource = Context.RootInstallFolder + "\\..\\..\\workshop\\content\\2868840";
  var WorkshopSupport = Context.Options["WorkshopSupport"];

  if (WorkshopSupport == "Yes") {
    //Check the folder exists, if not then create it.
    if (!System.IO.Directory.Exists(modsDestination)) {
      System.IO.Directory.CreateDirectory(modsDestination);
    };
    Context.CopyFolder(modsSource,modsDestination);
  };
  
  //Check if the settings file already exists. If not, copy the provided settings file into the directory.
  if (!System.IO.File.Exists(settingsFile)) {
    var providedSettingsPath = Context.ScriptFolder  + "\\settings.save";
	System.IO.Directory.CreateDirectory(playerFolder);
	System.IO.File.Copy(providedSettingsPath, settingsFile, true);
  };
  
  //Player 1 gets audio, the volume_master is omitted in favour of player's setting
  if (Context.PlayerID == 0) {
	  var modifySettings = [
	   Context.FindLineNumberInTextFile(settingsFile, 'aspect_ratio', Nucleus.SearchType.Contains) + '|"aspect_ratio": "auto",',
	   Context.FindLineNumberInTextFile(settingsFile, 'limit_fps_in_background', Nucleus.SearchType.Contains) + '|"limit_fps_in_background": false,',
	   Context.FindLineNumberInTextFile(settingsFile, 'fullscreen', Nucleus.SearchType.Contains) + '|"fullscreen": false,',
	  ];
	  Context.ReplaceLinesInTextFile(settingsFile, modifySettings);
  };
  
  //Mute audio for other players
  if (Context.PlayerID != 0) {
	  var modifySettings = [
	   Context.FindLineNumberInTextFile(settingsFile, 'aspect_ratio', Nucleus.SearchType.Contains) + '|"aspect_ratio": "auto",',
	   Context.FindLineNumberInTextFile(settingsFile, 'volume_master', Nucleus.SearchType.Contains) + '|"volume_master": 0.0,',
	   Context.FindLineNumberInTextFile(settingsFile, 'limit_fps_in_background', Nucleus.SearchType.Contains) + '|"limit_fps_in_background": false,',
	   Context.FindLineNumberInTextFile(settingsFile, 'fullscreen', Nucleus.SearchType.Contains) + '|"fullscreen": false,',
	  ];
	  Context.ReplaceLinesInTextFile(settingsFile, modifySettings);
  };

  Game.ProtoInput.OnInputLocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      //ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

      ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, true);

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);

      ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 0, true, true, false, false, false);

      System.Threading.Thread.Sleep(1000);

      ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);
    }
  };

  Game.ProtoInput.OnInputUnlocked = function() {
    for (var i = 0; i < PlayerList.Count; i++) {
      var player = PlayerList[i];

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetRawInputDataHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.RegisterRawInputHookID);
      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.MessageFilterHookID);

      ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
      ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

      ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

      ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
    }
  };
};
