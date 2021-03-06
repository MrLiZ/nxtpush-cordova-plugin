var NXTPlugin = function () {}

// private plugin function

NXTPlugin.prototype.receiveMessage = {}
NXTPlugin.prototype.openNotification = {}
NXTPlugin.prototype.receiveNotification = {}

NXTPlugin.prototype.isPlatformIOS = function () {
  var isPlatformIOS = (device.platform == 'iPhone' ||
    device.platform == 'iPad' ||
    device.platform == 'iPod touch' ||
    device.platform == 'iOS')
  return isPlatformIOS
}

NXTPlugin.prototype.errorCallback = function (msg) {
  console.log('Javascript Callback Error: ' + msg)
}

NXTPlugin.prototype.callNative = function (name, args, successCallback) {
   if (this.isPlatformIOS()) {
     // IOS 执行极光推送原有逻辑
     cordova.exec(successCallback, this.errorCallback, 'JPushPlugin', name, args)
  } else {
    // Android执行新逻辑
     cordova.exec(successCallback, this.errorCallback, 'NXTPushPlugin', name, args)
  }
}

// Common methods
NXTPlugin.prototype.init = function () {
  if (this.isPlatformIOS()) {
    this.callNative('initial', [], null)
  } else {
    this.callNative('init', [], null)
  }
}

NXTPlugin.prototype.setDebugMode = function (mode) {
  if (device.platform === 'Android') {
    this.callNative('setDebugMode', [mode], null)
  } else {
    if (mode === true) {
      this.setDebugModeFromIos()
    } else {
      this.setLogOFF()
    }
  }
}

NXTPlugin.prototype.getRegistrationID = function (successCallback) {
  this.callNative('getRegistrationID', [], successCallback)
}

NXTPlugin.prototype.stopPush = function () {
  this.callNative('stopPush', [], null)
}

NXTPlugin.prototype.resumePush = function () {
  this.callNative('resumePush', [], null)
}

NXTPlugin.prototype.isPushStopped = function (successCallback) {
  this.callNative('isPushStopped', [], successCallback)
}

NXTPlugin.prototype.clearLocalNotifications = function () {
  if (device.platform === 'Android') {
    this.callNative('clearLocalNotifications', [], null)
  } else {
    this.clearAllLocalNotifications()
  }
}

NXTPlugin.prototype.setTagsWithAlias = function (tags, alias) {
  if (tags == null) {
    this.setAlias(alias)
    return
  }
  if (alias == null) {
    this.setTags(tags)
    return
  }
  var arrayTagWithAlias = [tags]
  arrayTagWithAlias.unshift(alias)
  this.callNative('setTagsWithAlias', arrayTagWithAlias, null)
}

NXTPlugin.prototype.setTags = function (tags) {
  this.callNative('setTags', tags, null)
}

NXTPlugin.prototype.setAlias = function (alias) {
  this.callNative('setAlias', [alias], null)
}

// 判断系统设置中是否对本应用启用通知。
// iOS: 返回值如果大于 0，代表通知开启；0: 通知关闭。
//		UIRemoteNotificationTypeNone    = 0,
//    	UIRemoteNotificationTypeBadge   = 1 << 0,
//    	UIRemoteNotificationTypeSound   = 1 << 1,
//    	UIRemoteNotificationTypeAlert   = 1 << 2,
//    	UIRemoteNotificationTypeNewsstandContentAvailability = 1 << 3,
// Android: 返回值 1 代表通知启用、0: 通知关闭。
NXTPlugin.prototype.getUserNotificationSettings = function (successCallback) {
  if (this.isPlatformIOS()) {
    this.callNative('getUserNotificationSettings', [], successCallback)
  } else if (device.platform == 'Android') {
    this.callNative('areNotificationEnabled', [], successCallback)
  }
}

// iOS methods

NXTPlugin.prototype.startJPushSDK = function () {
  this.callNative('startJPushSDK', [] , null)
}

NXTPlugin.prototype.setBadge = function (value) {
  if (this.isPlatformIOS()) {
    this.callNative('setBadge', [value], null)
  }
}

NXTPlugin.prototype.resetBadge = function () {
  if (this.isPlatformIOS()) {
    this.callNative('resetBadge', [], null)
  }
}

NXTPlugin.prototype.setDebugModeFromIos = function () {
  if (this.isPlatformIOS()) {
    this.callNative('setDebugModeFromIos', [], null)
  }
}

NXTPlugin.prototype.setLogOFF = function () {
  if (this.isPlatformIOS()) {
    this.callNative('setLogOFF', [], null)
  }
}

NXTPlugin.prototype.setCrashLogON = function () {
  if (this.isPlatformIOS()) {
    this.callNative('crashLogON', [], null)
  }
}

NXTPlugin.prototype.addLocalNotificationForIOS = function (delayTime, content,
  badge, notificationID, extras) {
  if (this.isPlatformIOS()) {
    this.callNative('setLocalNotification', [delayTime, content, badge, notificationID, extras], null)
  }
}

NXTPlugin.prototype.deleteLocalNotificationWithIdentifierKeyInIOS = function (identifierKey) {
  if (this.isPlatformIOS()) {
    this.callNative('deleteLocalNotificationWithIdentifierKey', [identifierKey], null)
  }
}

NXTPlugin.prototype.clearAllLocalNotifications = function () {
  if (this.isPlatformIOS()) {
    this.callNative('clearAllLocalNotifications', [], null)
  }
}

NXTPlugin.prototype.setLocation = function (latitude, longitude) {
  if (this.isPlatformIOS()) {
    this.callNative('setLocation', [latitude, longitude], null)
  }
}

NXTPlugin.prototype.startLogPageView = function (pageName) {
  if (this.isPlatformIOS()) {
    this.callNative('startLogPageView', [pageName], null)
  }
}

NXTPlugin.prototype.stopLogPageView = function (pageName) {
  if (this.isPlatformIOS()) {
    this.callNative('stopLogPageView', [pageName], null)
  }
}

NXTPlugin.prototype.beginLogPageView = function (pageName, duration) {
  if (this.isPlatformIOS()) {
    this.callNative('beginLogPageView', [pageName, duration], null)
  }
}

NXTPlugin.prototype.setApplicationIconBadgeNumber = function (badge) {
  if (this.isPlatformIOS()) {
    this.callNative('setApplicationIconBadgeNumber', [badge], null)
  }
}

NXTPlugin.prototype.getApplicationIconBadgeNumber = function (callback) {
  if (this.isPlatformIOS()) {
    this.callNative('getApplicationIconBadgeNumber', [], callback)
  }
}

NXTPlugin.prototype.addDismissActions = function (actions, categoryId) {
  this.callNative('addDismissActions', [actions, categoryId])
}

NXTPlugin.prototype.addNotificationActions = function (actions, categoryId) {
  this.callNative('addNotificationActions', [actions, categoryId])
}

// Android methods
NXTPlugin.prototype.setBasicPushNotificationBuilder = function () {
  if (device.platform == 'Android') {
    this.callNative('setBasicPushNotificationBuilder', [], null)
  }
}

NXTPlugin.prototype.setCustomPushNotificationBuilder = function () {
  if (device.platform == 'Android') {
    this.callNative('setCustomPushNotificationBuilder', [], null)
  }
}

NXTPlugin.prototype.receiveRegistrationIdInAndroidCallback = function (data) {
   if (device.platform === 'Android') {
     data = JSON.stringify(data)
     var event = JSON.parse(data)
     cordova.fireDocumentEvent('jpush.receiveRegistrationId', event);
   }
 }

NXTPlugin.prototype.receiveMessageInAndroidCallback = function (data) {
  data = JSON.stringify(data)
  console.log('NXTPlugin:receiveMessageInAndroidCallback: ' + data)
  this.receiveMessage = JSON.parse(data)
  cordova.fireDocumentEvent('jpush.receiveMessage', this.receiveMessage)
}

// NXTPlugin.prototype.openNotificationInAndroidCallback = function (data) {
//   data = JSON.stringify(data)
//   console.log('NXTPlugin:openNotificationInAndroidCallback: ' + data)
//   this.openNotification = JSON.parse(data)
//   cordova.fireDocumentEvent('jpush.openNotification', this.openNotification)
// }


NXTPlugin.prototype.openNotificationInAndroidCallback = function (data) {
  data = JSON.stringify(data)
  console.log('NXTPlugin:openNotificationInAndroidCallback: ' + data)
  this.openNotification = JSON.parse(data);
  // 处理华为消息
  var retObj={};
  if(Object.prototype.toString.call(this.openNotification.extras) == "[object String]"){
        var extra = JSON.parse(this.openNotification.extras);
        for(var i = 0; i<=extra.length; i++){
            Object.assign(retObj, extra[i]);
        }
        this.openNotification.extras = retObj;
  }
  cordova.fireDocumentEvent('jpush.openNotification', this.openNotification)
}


// NXTPlugin.prototype.receiveNotificationInAndroidCallback = function (data) {
//   data = JSON.stringify(data)
//   console.log('NXTPlugin:receiveNotificationInAndroidCallback: ' + data)
//   this.receiveNotification = JSON.parse(data)
//   cordova.fireDocumentEvent('jpush.receiveNotification', this.receiveNotification)
// }

NXTPlugin.prototype.receiveNotificationInAndroidCallback = function (data) {
  data = JSON.stringify(data)
  console.log('NXTPlugin:receiveNotificationInAndroidCallback: ' + data)
  this.receiveNotification = JSON.parse(data);
  // 处理华为消息
  var retObj ={};
  if(Object.prototype.toString.call(this.receiveNotification.extras) == "[object String]"){
        var extra = JSON.parse(this.receiveNotification.extras);
        for(var i = 0; i<=extra.length; i++){
           Object.assign(retObj, extra[i]);
        }
        this.receiveNotification.extras =  retObj;
  }
  cordova.fireDocumentEvent('jpush.receiveNotification', this.receiveNotification)
}

NXTPlugin.prototype.clearAllNotification = function () {
  if (device.platform === 'Android') {
    this.callNative('clearAllNotification', [], null)
  }
}

NXTPlugin.prototype.clearNotificationById = function (id) {
  if (device.platform === 'Android') {
    this.callNative('clearNotificationById', [id], null)
  }
}

NXTPlugin.prototype.setLatestNotificationNum = function (num) {
  if (device.platform == 'Android') {
    this.callNative('setLatestNotificationNum', [num], null)
  }
}

NXTPlugin.prototype.addLocalNotification = function (builderId, content, title,
  notificationID, broadcastTime, extras) {
  if (device.platform == 'Android') {
    this.callNative('addLocalNotification',
      [builderId, content, title, notificationID, broadcastTime, extras], null)
  }
}

NXTPlugin.prototype.removeLocalNotification = function (notificationID) {
  if (device.platform === 'Android') {
    this.callNative('removeLocalNotification', [notificationID], null)
  }
}

NXTPlugin.prototype.reportNotificationOpened = function (msgID) {
  if (device.platform === 'Android') {
    this.callNative('reportNotificationOpened', [msgID], null)
  }
}

/**
 *是否开启统计分析功能，用于“用户使用时长”，“活跃用户”，“用户打开次数”的统计，并上报到服务器上，
 *在 Portal 上展示给开发者。
 */
NXTPlugin.prototype.setStatisticsOpen = function (mode) {
  if (device.platform == 'Android') {
    this.callNative('setStatisticsOpen', [mode], null)
  }
}

/**
 * 用于在 Android 6.0 及以上系统，申请一些权限
 * 具体可看：http://docs.jpush.io/client/android_api/#android-60
 */
NXTPlugin.prototype.requestPermission = function () {
  if (device.platform == 'Android') {
    this.callNative('requestPermission', [], null)
  }
}

NXTPlugin.prototype.setSilenceTime = function (startHour, startMinute, endHour, endMinute) {
  if (device.platform == 'Android') {
    this.callNative('setSilenceTime', [startHour, startMinute, endHour, endMinute], null)
  }
}

NXTPlugin.prototype.setPushTime = function (weekdays, startHour, endHour) {
  if (device.platform == 'Android') {
    this.callNative('setPushTime', [weekdays, startHour, endHour], null)
  }
}


// 收到华为token
NXTPlugin.prototype.onReceiveHuaWeiToken = function (token) {
  if (device.platform == 'Android') {
      var data = JSON.stringify(token)
      console.log('NXTPlugin:onReceiveHuaWeiTokenCallBack: '+ data)
      this.receiveHWToken = JSON.parse(data)
      cordova.fireDocumentEvent('jpush.onReceiveHuaWeiToken',  this.receiveHWToken)
  }
}

if (!window.plugins) {
  window.plugins = {}
}

if (!window.plugins.NXTPlugin) {
  window.plugins.NXTPlugin = new NXTPlugin()
}

module.exports = new NXTPlugin()
