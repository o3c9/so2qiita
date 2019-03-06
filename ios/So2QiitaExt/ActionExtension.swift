//
//  ActionExtension.swift
//  So2QiitaExt
//
//  Created by tomoya-hirano on 2019/03/04.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import MobileCoreServices
import UIKit
import os.log

let log = OSLog(subsystem: "com.o3c9.so2qiita", category: "ActionExtension")

@objc(ActionExtension)
class ActionExtension: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc
  func done() {
    os_log("done", log: log, type: .default)
    actionViewController.done()
  }
  
  @objc
  func url(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
    guard
      let inputItem = actionViewController.extensionContext?.inputItems.first as? NSExtensionItem,
      let attachments = inputItem.attachments
      else {
        let error = NSError(domain: "", code: 400, userInfo: nil)
        reject("E_URL", "cannot obtain url", error)
        return
    }
    
    for provider in attachments {
      if provider.hasItemConformingToTypeIdentifier(kUTTypeURL as String) {
        provider.loadItem(forTypeIdentifier: kUTTypeURL as String, options: nil, completionHandler: { (target, error) in
          let url = target as! URL
          os_log("loadItem()", log: log, type: .default)
          resolve(url.absoluteString)
        })
        break
      }
    }
  }
}
