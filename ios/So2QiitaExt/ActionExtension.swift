//
//  ActionExtension.swift
//  So2QiitaExt
//
//  Created by tomoya-hirano on 2019/03/04.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import os.log

let log = OSLog(subsystem: "com.o3c9.so2qiita", category: "ActionExtension")

@objc(ActionExtension)
class ActionExtension: NSObject {
  @objc
  func done() {
    os_log("done", log: log, type: .default)
    actionViewController.done()
  }
}
