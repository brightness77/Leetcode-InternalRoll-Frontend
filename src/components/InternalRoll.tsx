import { useCallback, useState } from "react";
import LeetcodeRequest from "../utils/LeetcodeRequest";
import juan from "../static/juan.png";

const styles = {
    textStyle : {
        color : '#E0E0E0',
        'font-size' : 25,
        'margin-left' : 50,
        'padding' : 20,
    },

    buttonStyle : {
        color : '#101010',
        'font-size' : 25,
        'margin-left' : 50,
    },

    inputBoxStyle : {
        'font-size' : 25,
        'size' : 30,
    }
}

var juancontent2 = 'xxx';

function InternalRoll(): React.ReactElement {

    const [usernameInput, setUsernameInput] = useState('');
    const [juanContent, setContent] = useState('目前还没有人卷');

    const onUsernameChange = useCallback((e: any) => {
        //console.log(e.target.value);
        setUsernameInput(e.target.value);
    }, []);

    const onRequestSuccess = useCallback((response : any) => {
        //console.log(response);
        const parsedResponse = JSON.parse(response);
        console.log(usernameInput);
        if(Object.keys(parsedResponse.submissionList).length == 0){
            //not brushed today
            setContent(`${usernameInput} 同学, 没刷题你还来看?`);
            juancontent2 = 'test2';
        } else {
            let today = parsedResponse.submissionList[0].count;
            if(today < 10){
                let left = 10 - today;
                setContent(`${usernameInput} 同学,今天已经刷了${today}题, 还差${left}题就可以下班啦!`);
            } else {
                setContent(`${usernameInput} 同学,今天已经刷了${today}题, 已经可以下班啦!`);
            }
        }
        //console.log(juanContent);

    }, [usernameInput]);

    const onRequestFail = useCallback(() => {
        setContent('怎么肥四, 今天还没有人开卷?');
    }, []);

    const onJuan = useCallback(() => {
        //console.log("username is " + usernameInput);
        new LeetcodeRequest(`stats/userToday?username=${usernameInput}`, 'GET')
            .onSuccess(onRequestSuccess)
            .onFailure(onRequestFail)
            .onError(onRequestFail)
            .send();
    }, [onRequestSuccess, onRequestFail, usernameInput]);


    const element1 = <h1> hello, world!</h1>;


    return (
        <>
            <p>
                <img src = {juan}/>
            </p>
            <p>
                <text style = {styles.textStyle}>你的力扣账号:        </text>
                <input onChange={onUsernameChange}/>
                <button onClick = {onJuan} style = {styles.buttonStyle}>卷起来</button>
            </p>
            <p style = {styles.textStyle}>
                {juanContent}
            </p>
        </>
    );
}

export default InternalRoll;