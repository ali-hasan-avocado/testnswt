export class BaseComponent {
    protected communicationError: boolean;
    protected communicationSuccess: boolean;
    handleSuccess(showToaster: boolean) {
        // TODO use toaster
        this.communicationSuccess = true;
        this.communicationError = false;
    }
    handleError() {
        // TODO use toaster for error handling
        this.communicationSuccess = false;
        this.communicationError = true;
        console.log('An error occured communicating with server.');
    }
}
