
export const globalDimensions = {

    topbarHeight : '60px',
    topbarButtomHeight : '40px',

    topbarMargin : '20px',

};


export const globalColors = {
    diff : {
        easy:{
            normal:'#3ac81d',
        },

        medium:{
            normal:'#d2900c',
        },

        hard:{
            normal:'#d2230c'
        },
    },
}


export const globalMessages = {

    serverErrorMessage : "服务器出问题了, 但 poor shawn 也不知道为什么",

    loginRequiredMessage : "Please log in",

    invalidProblemMessage : "没有找到这道题!",

    forbiddenMessage : "You are forbidden!",

    needRefreshMessage : "服务器出问题了, 可能刷新一下能解决?"

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

        mainContainer : {
            parentWithGap : {
                display:'flex',
                flexDirection:'column',
                mt:'30px',
                alignItems:'center',
                justifyContent:'center',
            },
    
            parentWithoutGap : {
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
            },

            withMargin : {
                display:'flex',
                flexDirection:'column',
                m:'10px',
                alignItems:'center',
                justifyContent:'center',
            }
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

