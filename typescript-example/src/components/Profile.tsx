import * as React from 'react';
 
// props 받아올 값의 type 을 선언
interface Iprops {
    name: string,
    job: string,
}
 
		// props type 설정
export function Profile(props: Iprops){
    return(
        <div>
            <h2>프로필</h2>
            <div>
                <b>이름 : { props.name }</b>
            </div>
            <div>
                <b>직업 : { props.job }</b>
            </div>
        </div>
    )
}