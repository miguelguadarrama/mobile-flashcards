import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const nkey = 'Udaflash:notification';

export function clearNotification() {
    return AsyncStorage.removeItem(nkey)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setNotification() {
    AsyncStorage.getItem(nkey)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(9);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                {
                                    title: "Quiz Reminder!",
                                    body: "Remember to take your daily quiz!",
                                    ios: {
                                        sound: true
                                    },
                                    android: {
                                        sound: true,
                                        sticky: false,
                                        vibrate: true,
                                        priority: 'high',
                                    }
                                },
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            );
                            AsyncStorage.setItem(nkey, JSON.stringify(true));
                        }
                    });
            }
        })
}