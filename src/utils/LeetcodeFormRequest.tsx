
type Method = 'GET' | 'POST';

class LeetcodeFormRequest {
    base: string = '/api';
    path: string;
    request: XMLHttpRequest;
    payload: any | undefined;
    method: string;

    //encapsulated handler
    handleSuccess: (response: any) => void = () => {};
    handleFailure: (response: any, status: number) => void = () => {};
    handleError: (err: any) => void = () => {};

    constructor (path: string, method: Method){
        this.request = new XMLHttpRequest();
        this.path = path;
        this.method = method;
    }

    setPayload(payload: any): LeetcodeFormRequest{
        this.payload = JSON.stringify(payload);
        return this;
    }

    onStart(handleStart: () => void): LeetcodeFormRequest {
        this.request.addEventListener('loadstart', handleStart);
        return this;
    }

    onFinished(): (this: XMLHttpRequest) => void {
        const handleSuccess = this.handleSuccess;
        const handleFailure = this.handleFailure;
        const handleError = this.handleError;

        return function (this: XMLHttpRequest){
            if(this.status >= 200 && this.status < 300){
                //succeeded!
                handleSuccess(this.response);
            } else if (this.status >= 500){
                //server error
                handleError(this.response);
            } else {
                //other error
                handleFailure(this.response, this.status);
            }
        }
    }

    onSuccess(handleSuccess: (response: any) => void): LeetcodeFormRequest {
        this.handleSuccess = handleSuccess;
        return this;
    }

    onFailure(handleFailure: (response: any, status: number) => void): LeetcodeFormRequest {
        this.handleFailure = handleFailure;
        return this;
    }

    onError(handleError: (err: any) => void): LeetcodeFormRequest {
        this.handleError = handleError;
        this.request.addEventListener('error', handleError);
        return this;
    }


    send(){
        this.request.open(this.method, `${this.base}/${this.path}`);
        this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.request.withCredentials = true;
        this.request.addEventListener('loadend', this.onFinished());
        this.request.send(this.payload);

        //console.log('send request to ' + `${this.base}/${this.path}`);
    }
}

export default LeetcodeFormRequest;