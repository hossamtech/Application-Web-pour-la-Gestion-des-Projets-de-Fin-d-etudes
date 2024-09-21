import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {DropzoneConfigInterface, DropzoneModule} from "ngx-dropzone-wrapper";
import {MDModalModule} from "../../../supervisor/components/modals/modal.module";
import {MnDropdownComponent} from "../../../components/dropdown";
import {SimplebarAngularModule} from "simplebar-angular";
import {FlatpickrModule} from "../../../components/flatpickr/flatpickr.module";
import {RouterLink} from "@angular/router";
import {activeFriendsData, MessageData, PopularEventsData, storyData, UpcomingBirthdayData} from "./dashboard";
import {BehaviorSubject} from "rxjs";
import {AuthenticationService} from "../../../../services/services/authentication.service";
import { Lightbox, LightboxModule } from "ngx-lightbox";
import {PublicationComponent} from "../../components/publication/publication.component";
import {MenuComponent} from "../../components/menu/menu.component";
import {DetailedListResponse} from "../../../../services/models/detailed-list-response";
import {ListProjectService} from "../../../../services/services/list-project.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LucideAngularModule,
    NgSelectModule,
    DropzoneModule,
    MDModalModule,
    MnDropdownComponent,
    SimplebarAngularModule,
    FlatpickrModule,
    RouterLink,
    LightboxModule,
    PublicationComponent,
    MenuComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit{
  storiesData: any;
  activeFriends: any;
  messageData: any;
  eventData: any;
  birthdayData: any;
  uploadedFiles: any[] = [];
  uploadedFile: any[] = [];
  images: any = [];
  profileImg$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  fullName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  projectList = [1, 2, 3, 4 ,5];
  listProject: any;
  supervisor: any;
  detailedList: DetailedListResponse[] | undefined;





  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  constructor(
      // public _cookiesService: CookieService,
      private authenticationService: AuthenticationService,
      private cdr: ChangeDetectorRef,
      private listProjectService: ListProjectService,
      private _lightbox: Lightbox) {
  }




  ngOnInit(): void {
    this.storiesData = storyData;
    this.activeFriends = activeFriendsData;
    this.messageData = MessageData;
    this.eventData = PopularEventsData;
    this.birthdayData = UpcomingBirthdayData;
    for (let i = 1; i <= this.storiesData.length; i++) {
      const src = 'https://cdn.dribbble.com/userupload/3012253/file/original-dd6cf163ea8f5617304d9d41f6ff38e7.png?resize=448/506';
      const thumb = 'https://cdn.dribbble.com/userupload/3012253/file/original-dd6cf163ea8f5617304d9d41f6ff38e7.png?resize=448/506';
      const album = {
        src: src,
        thumb: thumb,
        Animation: false,
      };
      this.images.push(album);
    }
    this.getUserDetails();
    this.findAllListProjects();
  }



  private findAllListProjects() {
    this.listProjectService.findAllListsWithStatusPlaced().subscribe({
      next: (projects: DetailedListResponse[]) => {
        if (projects && projects.length > 0) {
          this.detailedList = projects;
          console.log(this.detailedList);
        } else {
          this.detailedList = [];
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false
  };

  public dropzonesConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false
  };


  // File Upload
  imageURL: any;
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
    }, 0);
  }

  onUploadsBorderSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFile.push(event[0]);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // Open story Image
  openImage(index: any) {
    this._lightbox.open(this.images, index, {});

    setTimeout(() => {
      const lightboxImage = document.getElementById('image');
      const nav = document.querySelector('.lb-nav');
      let prev = document.querySelector('.lb-prev');
      let next = document.querySelector('.lb-next');
      if (lightboxImage && nav) {
        lightboxImage.removeAttribute('hidden');
        nav.removeAttribute('hidden');
        prev?.removeAttribute('hidden');
        next?.removeAttribute('hidden');
      }
    }, 100);
  }

  getUserDetails() {
    this.authenticationService.getUserDetails().subscribe({
      next: (user) => {
        this.profileImg$.next('data:image/jpg;base64,' + user.profileImg);
        this.fullName$.next(user.fullName ?? null);
      },
      error: (err) => {
        console.error('Error fetching user details', err);
        // Handle error, maybe show a message or a different UI state
      }
    });
  }
}
