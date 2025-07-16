import React from 'react';
import FallingText from './FallingText';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ height: '850px', alignSelf: 'center' }}>
            <FallingText text={`404 Page Not Found \n 페이지를 찾을 수 없습니다.`}
                highlightWords={["404"]}
                highlightClass="highlighted"
                trigger="click"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.1}
                fontSize="5rem"
                mouseConstraintStiffness={0.9}
            />
            <Link to='/' className='projects-content'><button className='btn btn-secondary btn-lg'>홈으로 돌아가기</button></Link>
        </div>
    );
};

export default NotFound;