//
//  SoundManager.swift
//  ChatAppT
//
//  Created by Le Tuyen on 26/03/2023.
//

import Foundation
import AVFoundation

@available(iOS 13.0, *)
class SoundManager : ObservableObject {
    var audioPlayer: AVPlayer?

    func playSound(sound: String){
        if let url = URL(string: sound) {
            self.audioPlayer = AVPlayer(url: url)
        } else {
          
        }
    }
}
