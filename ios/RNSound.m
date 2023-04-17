//
//  RNSound.m
//  ChatAppT
//
//  Created by Le Tuyen on 26/03/2023.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(RNSound,NSObject)

RCT_EXTERN_METHOD(sound:(NSString)url)
RCT_EXTERN_METHOD(testCallback:(RCTResponseSenderBlock)callback)

@end
