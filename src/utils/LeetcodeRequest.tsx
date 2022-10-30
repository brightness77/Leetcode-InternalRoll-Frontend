
type Method = 'GET' | 'POST';

class LeetcodeRequest {
    base: string = '/api';
    path: string;
    request: XMLHttpRequest;
    payload: any | undefined;
    method: string;
    handleSuccess: (response: any) => void = () => {};
    handleFailure: (response: any, status: number) => void = () => {};

    constructor (path: string, method: Method){
        this.request = new XMLHttpRequest();
        this.path = path;
        this.method = method;
    }


    setPayload(payload: any): LeetcodeRequest{
        this.payload = JSON.stringify(payload);
        return this;
    }

    onStart(handleStart: () => void): LeetcodeRequest {
        this.request.addEventListener('loadstart', handleStart);
        return this;
    }

    onFinished(): (this: XMLHttpRequest) => void {
        const handleSuccess = this.handleSuccess;
        const handleFailure = this.handleFailure;

        return function (this: XMLHttpRequest){
            if(this.status >= 200 && this.status < 300){
                //succeeded!
                handleSuccess(this.response);
            } else {
                handleFailure(this.response, this.status);
            }
        }
    }

    onSuccess(handleSuccess: (response: any) => void): LeetcodeRequest {
        this.handleSuccess = handleSuccess;
        return this;
    }

    onFailure(handleFailure: (response: any, status: number) => void): LeetcodeRequest {
        this.handleFailure = handleFailure;
        return this;
    }

    onError(handleError: (err: any) => void): LeetcodeRequest {
        this.request.addEventListener('error', handleError);
        return this;
    }


    send(){
        this.request.open(this.method, `${this.base}/${this.path}`);
        this.request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.request.withCredentials = true;
        this.request.addEventListener('loadend', this.onFinished());
        this.request.send(this.payload);

        //console.log('send request to ' + `${this.base}/${this.path}`);
    }
}

export default LeetcodeRequest;
