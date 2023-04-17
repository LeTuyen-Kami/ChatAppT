//
//  RNSound.swift
//  ChatAppT
//
//  Created by Le Tuyen on 26/03/2023.
//

import Foundation

@available(iOS 13.0, *)
@objc(RNSound)
class RNSound: NSObject {
  
  let soundManager = SoundManager()
  
  
  @objc
  func sound(_ url: String) {
    soundManager.playSound(sound: url)
    soundManager.audioPlayer?.play()
  }
  
  @objc func testCallback(_ callback: RCTResponseSenderBlock) {
    callback([1])
  }
  
  @objc static func requiresMainQueueSetup() -> Bool { return true }

}
