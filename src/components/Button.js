/*
    WhiteButton 白色按钮
    PurpleButton 紫色按钮

    可传参数
    props:{
        disabled 按钮不能点击
        width：默认width 86px 可设置
        height：默认height 36px 可设置
    }
*/
import styled from 'styled-components'

const Button = styled.div.attrs({
     width: props => props.width || '86px',
     height: props => props.height || '36px',
    })`
    width:  ${ props => props.width };
    height: ${ props => props.height };
    font-size: 14px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    line-height: ${ props => props.height };
    border-radius: 4px;
    cursor: pointer; 
    outline: none; 
`;

const WhiteButton = Button.extend`
    background: ${props => props.disabled ? '#EAEEF1' : 'none'};
    color: #354052;
    border: ${props => props.disabled ? '1px solid #DFE3E9' : '1px solid #CED0DA'};
    opacity: ${props => props.disabled ? '0.5' : '1'};
    background-image: ${props => props.disabled ? 'none' : 'linear-gradient(0deg, #F2F4F7 0%, #FFFFFF 100%)'};
    &:hover{
        background-image:  ${props => props.disabled ? 'none' : 'linear-gradient(0deg, #EBEEF3 0%, #FFFFFF 100%)'};
    };
    &:active{
        background-image:  ${props => props.disabled ? 'none' : 'linear-gradient(-1deg, #E1E4E9 0%, #F3F7FA 97%)'};
    } 
`;

const PurpleButton = Button.extend`
    color: ${props => props.disabled ? '#354052' : '#FFFFFF'};
    opacity: ${props => props.disabled ? '0.5' : '1'};
    background:  ${props => props.disabled ? '#EAEEF1' : 'none'};
    border: ${props => props.disabled ? '1px solid #DFE3E9' : '1px solid #685196'};
    background-image: ${props => props.disabled ? 'none' : 'linear-gradient(-180deg, #7860A9 0%, #6B529E 100%)'};
    &:hover{
       background-image: ${props => props.disabled ? 'none' : 'linear-gradient(-180deg, #654C97 0%, #5F4691 100%)'};
    };
    &:active{
        background-image: ${props => props.disabled ? 'none' : 'linear-gradient(-180deg, #493475 0%, #48346F 100%)'};
        border: ${props => props.disabled ? '' : '1px solid #3B2A5E'};
    }
`;

const GreenButton =  Button.extend`
    color:#FFF;
    background-image: linear-gradient(-180deg, #39B54A 0%, #34AA44 98%);
    border: 1px solid #249533;
`;

const RedButton =  Button.extend`
   color:#FFF;
   background-image: linear-gradient(-180deg, #F95359 3%, #DD151C 98%);
   border: 1px solid #DB161E;
`;

export  { WhiteButton, PurpleButton, GreenButton, RedButton } 