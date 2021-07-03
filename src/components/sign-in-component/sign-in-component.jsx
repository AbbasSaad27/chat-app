import React from 'react';
import { signInWithFaceBook, signInWithGoogle } from '../../firebase/firebase.utils';
import CustomBtn from '../custom-btn/custom-btn.component';
import './sign-in-styles.css';

const SignIn = () => {
    return (
        <div className="sign-in">
            <h1 className="title">Can't think of a Name</h1>
            <span className="sub-title">Sign in to chat</span>
            <CustomBtn classname="google" func={signInWithGoogle}>Sign In With Google</CustomBtn>
            <CustomBtn classname="faceBook" func={signInWithFaceBook}>Sign In With FaceBook</CustomBtn>
        </div>
    );
}
 
export default SignIn;