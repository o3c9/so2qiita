//
//  ActionViewController.m
//  So2QiitaExt
//
//  Created by tomoya-hirano on 2019/03/04.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "ActionViewController.h"
#import <MobileCoreServices/MobileCoreServices.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@interface ActionViewController ()

@property(strong,nonatomic) IBOutlet UIImageView *imageView;

@end

ActionViewController * actionViewController = nil;

@implementation ActionViewController

- (void)loadView {
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  NSDictionary *initialProps = [NSDictionary dictionaryWithObject:[NSNumber numberWithBool: TRUE] forKey:@"isExtension"];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"So2Qiita"
                                               initialProperties:initialProps
                                                   launchOptions:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  self.view = rootView;
  actionViewController = self;
}

- (IBAction)done {
    // Return any edited content to the host app.
    // This template doesn't do anything, so we just echo the passed in items.
    [self.extensionContext completeRequestReturningItems:self.extensionContext.inputItems completionHandler:nil];
}

@end
