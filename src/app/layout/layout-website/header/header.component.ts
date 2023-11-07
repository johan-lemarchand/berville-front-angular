import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {Subject, takeUntil} from "rxjs";
import {FuseMediaWatcherService} from "../../../../@fuse/services/media-watcher";
import {FuseNavigationService, FuseVerticalNavigationComponent} from "../../../../@fuse/components/navigation";
import { Navigation } from 'app/core/navigation/navigation.types';
import {NavigationService} from "../../../core/navigation/navigation.service";
import {RouterLink, RouterOutlet, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatButtonModule,
        NgIf,
        MatIconModule,
        FuseVerticalNavigationComponent,
        RouterLink,
        RouterOutlet,
        RouterLinkActive,
    ]
})

export class HeaderComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private _navigationService: NavigationService,
    ) {
    }

     ngOnInit() {
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) =>
            {
                this.navigation = navigation;
            });

        this._fuseMediaWatcherService.onMediaChange$
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(({matchingAliases}) =>
                {
                    // Check if the screen is small
                    this.isScreenSmall = !matchingAliases.includes('md');
            });
  }

  ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

  /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
