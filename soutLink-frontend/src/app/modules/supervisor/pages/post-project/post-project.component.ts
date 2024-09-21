    import {Component, OnInit, ViewEncapsulation} from '@angular/core';
    import {LucideAngularModule} from "lucide-angular";
    import {DROPZONE_CONFIG, DropzoneConfigInterface, DropzoneModule} from "ngx-dropzone-wrapper";
    import {FlatpickrModule} from "../../../components/flatpickr/flatpickr.module";
    import {NgSelectModule} from "@ng-select/ng-select";
    import {PageTitleComponent} from "../../components/page-title/page-title.component";
    import {TopicsSummaryComponent} from "../../components/topics-summary/topics-summary.component";
    import {FileSizePipe} from "../../components/file-size/file-size.pipe";
    import {TruncateFileNamePipe} from "../../components/truncate-file/truncate-file-name.pipe";
    import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
    import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import {ProjectService} from "../../../../services/services/project.service";
    import {ProjectRequest} from "../../../../services/models/project-request";
    import {SummaryResponse} from "../../../../services/models/summary-response";
    import {ActivatedRoute, Router, RouterLink} from "@angular/router";
    import {ProjectResponse} from "../../../../services/models/project-response";
    import {animate, style, transition, trigger} from "@angular/animations";
    import {ToastrService} from "ngx-toastr";
    import Swal from "sweetalert2";


    const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: 'https://httpbin.org/post',
    maxFilesize: 50, // Max file size in MB
    acceptedFiles: '', // Accept all file types
    };

    @Component({
    selector: 'app-post-project',
    standalone: true,
    imports: [
        LucideAngularModule,
        DropzoneModule,
        FlatpickrModule,
        NgSelectModule,
        PageTitleComponent,
        TopicsSummaryComponent,
        FileSizePipe,
        TruncateFileNamePipe,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
    ],
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        },
    ],
    templateUrl: './post-project.component.html',
    styleUrl: './post-project.component.scss',
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('itemAnim', [
            transition(':enter', [
                style({
                    height: 0,
                    opacity: 0,
                    transform: 'scale(0.85)',
                    marginBottom: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingRight: 0,
                    paddingLeft: 0,
                }),
                animate(
                    '300ms ease-out',
                    style({
                        height: '*',
                        opacity: 1,
                        transform: 'scale(1)',
                        marginBottom: '*',
                        paddingTop: '*',
                        paddingBottom: '*',
                        paddingLeft: '*',
                        paddingRight: '*',
                    })
                ),
            ]),
            transition(':leave', [
                animate(
                    '200ms ease-in',
                    style({
                        opacity: 0,
                        transform: 'scale(0.85)',
                        height: 0,
                        marginBottom: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        paddingRight: 0,
                    })
                ),
            ]),
        ]),
    ],
    })
    export class PostProjectComponent implements OnInit {

    selectedSize: number | undefined;
    public Editor = ClassicEditor;
    public form!: FormGroup;
    projectRequest: ProjectRequest = {title: '', numberStudents: 2, description: ''};
    uploadedFiles: any[] = [];
    summaryItems: any[] = [];
    summary: any;
    projectId: any;
    filesDeleted: any[] = [];
    isLoaded: boolean = false;
    public editorConfig = {
        placeholder: 'Start typing here...',
    };
    public dropzoneConfig: DropzoneConfigInterface = {
        clickable: true,
        addRemoveLinks: true,
        previewsContainer: false
    };

    constructor(
        private projectService: ProjectService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private toastService: ToastrService
    ) {
    }

    get numberOfStudents(): FormControl {
        return this.form.get('numberOfStudents') as FormControl;
    }


    ngOnInit() {
        this.uploadedFiles = [];
        this.onSizeChange(this.projectRequest.numberStudents);

        this.initializeForm();

        this.activatedRoute.params.subscribe((params) => {
            this.projectId = params['projectId'];
            if (this.projectId) {
                this.projectService.findBookById({
                    'project-id': this.projectId,
                }).subscribe({
                    next: (project: ProjectResponse) => {
                        this.projectRequest = {
                            id: project.id,
                            title: project.title as string,
                            numberStudents: project.numberStudents,
                            description: project.description as string,
                        };
                        console.log(project.files);
                        const transformedFiles = project.files?.map(file =>
                            this.transformToDropzoneFile(file)) || [];

                        this.uploadedFiles = transformedFiles || [];
                        console.log(this.uploadedFiles);
                        this.updateFormWithProjectData();
                    },
                });
            }
            this.summaryProject();
        });
    }

    initializeForm(){
        this.form = this.fb.group({
            projectTitle: ['', [Validators.required, Validators.maxLength(20)]],
            numberOfStudents: [2],
            description: [''],
        });
    }

    transformToDropzoneFile(file: any): any {
        return {
            status: 'success',
            accepted: true,
            processing: true,
            name: file.fileName,
            size: file.size,
            type: file.fileType,
            dataURL: 'data:image/png;base64,' + file.file || '',
            upload: {
                uuid: file.id,
                progress: 100,
                total: file.size,
                bytesSent: file.size
            },
            xhr: null
        };
    }

    updateFormWithProjectData() {
        this.form.patchValue({
            projectTitle: this.projectRequest.title || '',
            numberOfStudents: this.projectRequest.numberStudents || 2,
            description: this.projectRequest.description || '',
        });
    }

        onSizeChange(size: number | undefined): void {
        this.selectedSize = size;
    }

    onUploadSuccess(event: any) {
        const newFile = event[0];

        const isDuplicate = this.uploadedFiles.some(file =>
            file.name === newFile.name
        );

        if (!isDuplicate) {
            setTimeout(() => {
                this.uploadedFiles.push(newFile);
            }, 0);
            this.toastService.success(`File "${newFile.name}" uploaded successfully.`);
        } else {
            this.toastService.warning(`File "${newFile.name}" is already uploaded.`);
        }
        console.log(this.uploadedFiles);
    }


    getFilePreview(file: any): string {
        if (file.type.startsWith('image/')) {
            return file.dataURL;
        } else if (file.type === 'application/pdf') {
            return 'assets/images/files/pdf-94.svg';
        } else if (file.type === 'application/x-rar-compressed') {
            return 'assets/images/new-document.png';
        } else {
            return 'assets/images/new-document.png';
        }
    }


    removeFile(event: any) {
        this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
        if (this.projectId && event.xhr == null) {
            this.filesDeleted.push(event.upload.uuid);
        }
    }

    onSubmit() {
        if (this.form.get('numberOfStudents')?.value > 0) {
            this.form.patchValue({
                projectFiles: this.uploadedFiles
            });
            this.saveProject();
            // this.positionToast('toast-bottom-right');
        } else {
            console.log('Form is invalid');
        }
    }

    saveProject() {
        this.isLoaded = true;
        this.projectRequest.title = this.form.get('projectTitle')?.value;
        this.projectRequest.numberStudents = this.form.get('numberOfStudents')?.value;
        this.projectRequest.description = this.form.get('description')?.value;
        this.projectService.saveProject({body: this.projectRequest}).subscribe({
            next: (projectId: number) => {
                // this.projectRequest.id = projectId;
                this.summaryItems.unshift({...this.projectRequest});

                if (this.filesDeleted.length > 0) {
                    this.projectService.deleteFileById({
                        body: this.filesDeleted
                    }).subscribe({
                        next: () => {
                            for (const id of this.filesDeleted) {
                                const index = this.uploadedFiles.findIndex(file => file.uuid === id);
                                if (index !== -1) {
                                    this.uploadedFiles.splice(index, 1);
                                }
                            }
                        }
                    })
                }

                if (this.uploadedFiles.length > 0) {
                    this.projectService.uploadFilesProject({
                        'project-id': projectId,
                        body: {
                            files: this.uploadedFiles
                        }
                    }).subscribe()
                }

                if (this.projectId) {
                    this.router.navigate(['encadrant', 'create-project']);
                }else {
                    this.uploadedFiles = [];
                    this.onSizeChange(this.projectRequest.numberStudents);
                    this.initializeForm();

                }

            },
            error: () => {
                console.error('Error saving project');
            },
        });
    }

    positionToast(position: any) {
        this.toastService.info('Welcome Back ! This is a Toast Notification', '', {
            timeOut: 60000,
            positionClass: position,
            closeButton: true
        });
    }


    summaryProject() {
        this.summaryItems = [];
        this.projectService.getSummaryByUserId()
            .subscribe({
                next: (res: SummaryResponse) => {
                    this.summary = res;
                    if (res.projectList) {
                        res.projectList.reverse().forEach((element: any) => {
                            this.summaryItems.push(element);
                        })
                    }

                }
            })
    }

    editProject(id: number) {
        this.router.navigate(['encadrant', 'create-project', id]);
        console.log('Edit Project with ID:', id);
    }

    deleteProject(id: number) {
        // Remove the item from the summaryItems array
        this.summaryItems = this.summaryItems.filter(
            (item) => item.id !== id
        );
        console.log('Deleted Project with ID:', id);
    }

        placeListProject() {
        // this.projectPlacedSuccessfully();
            this.projectService.placeListProjects()
                .subscribe({
                    next: () => {
                        this.projectPlacedSuccessfully()
                    }
                })
        }

        projectPlacedSuccessfully() {
            Swal.fire({
                title: 'Projects Placed!',
                text: 'Your email has been successfully placed your projects.',
                imageUrl: 'assets/images/success_placed.jpg',
                // imageHeight: 200,
                // icon: "success",
                showCancelButton: false,
                confirmButtonText: 'Ok', // Change button text here
                customClass: {
                    confirmButton: 'text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600  active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20 ltr:mr-1 rtl:ml-1',
                    cancelButton: 'text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20',
                },
                buttonsStyling: false,
                showCloseButton: true,
                didClose: () => {
                    this.router.navigate(['encadrant', 'projects']);
                }
            })
        }
    }
