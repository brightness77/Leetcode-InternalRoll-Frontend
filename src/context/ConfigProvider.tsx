
export const globalDimensions = {

    topbarHeight : '60px',
    topbarButtomHeight : '40px',

    topbarMargin : '20px',

};


export const globalColors = {
    diff : {

        all:{
            normal:'#696969',
            background:'#d8d8d8',
        },

        easy:{
            normal:'#3ac81d',
            background:'#abef9d',
        },

        medium:{
            normal:'#d2900c',
            background:'#f5d596',
        },

        hard:{
            normal:'#d2230c',
            background:'#f5b1a8',
        },
    },
}


export const globalMessages = {

    serverErrorMessage : "服务器出问题了, 但 teacher miao miao 也不知道为什么",

    loginRequiredMessage : "Please log in",

    invalidProblemMessage : "Invalid problem input!",

    noQualifiedProblem : "No qualified problem found!",

    forbiddenMessage : "You are forbidden!",

    needRefreshMessage : "服务器出问题了, 可能刷新一下能解决?",

    usernameNotFoundMessage : "404 not found!",

    listExceptions: {
        noProblemRecord:"No problem record yet!",
        noTopicRecord:"No topic record yet!",
        noProblemSolveRecord:"No solve record for this problem yet!",
    },

};


export const texts_en = {

    problemFrontendID : "Problem ID",
    problemFrontendID_short : "ID",

    problemType : "Type",
    problemTypeNew : "New Problem",
    problemTypeOld : "Old Problem",

    problemDifficulty: "Difficulty",
    problemDifficulty0: "All",
    problemDifficulty1: "Easy",
    problemDifficulty2: "Medium",
    problemDifficulty3: "Hard",

    recordACCount: "AC Count",
    recordACCountMin: "Min AC Count",
    recordACCountMax: "Max AC Count",

    recordProficiency: "Proficiency",
    recordAverageProficiency: "Average Proficiency",
    recordRecentProficiency: "Recent Proficiency",
    recordProficiencyLow: "Lowest Proficiency",
    recordProficiencyLow_short: "Low Prof",
    recordProficiencyHigh: "Highest Proficiency",
    recordProficiencyHigh_short: "High Prof",

    problemTopicTags: "Topic Tags",

};



export const globalStyles = {


    viewContainerStyle : {
        display: 'flex',
        flexDirection : 'column',
        minHeight: '100vh',
        p:'0px',
    },


    viewWholeContainerStyle : {
        mt : globalDimensions.topbarHeight,
        minWidth : '100vh',
        flexGrow : 1,
    },


    component : {

        mainContainer:{
            flexColumnAlignCenter:{
                withGap:{
                    display:'flex',
                    flexDirection:'column',
                    mt:'30px',
                    alignItems:'center',
                    justifyContent:'center',
                },
        
                withoutGap:{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center',
                },
            },

            flexRowAlignFlexStart:{
                withGap:{
                    display:'flex',
                    flexDirection:'row',
                    mt:'30px',
                    alignItems:'flex-start',
                    justifyContent:'center',
                },
        
                withoutGap:{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'flex-start',
                    justifyContent:'center',
                },
            },

        },

        subContainer:{
            flexColumnAlignCenter:{
                withMargin : {
                    display:'flex',
                    flexDirection:'column',
                    m:'15px',
                    alignItems:'center',
                    justifyContent:'center',
                },
            }, 

            flexRowAlignFlexStart:{

            },

        },
    
        mainPaper: {
            withoutMargin : {
                width:'100%',
            },
    
            withMargin : {
                m:'10px',
                width:'100%',
            },
        },
    

        list : {
            listParent : {
                alignItems:'center',
            },

            listItem : {
                flexRowCenter:{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                },

                blockLeft:{
                    
                },
            },
        },

    },


    diffText : {
        easy : {
            fontWeight: 'bold',
            color : globalColors.diff.easy.normal,
        },
    
        medium : {
            fontWeight: 'bold',
            color : globalColors.diff.medium.normal,
        },
    
        hard : {
            fontWeight: 'bold',
            color : globalColors.diff.hard.normal,
        },
    },

};

