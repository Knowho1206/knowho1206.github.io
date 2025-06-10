import React from 'react';
import FallingText from './FallingText';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{height:'850px', alignSelf:'center'}}>
            <FallingText text={`404 Page Not Found 죄송합니다. 요청하신 페이지를 찾을 수 없습니다. 입력하신 주소가 잘못되었거나, 페이지가 이동 또는 삭제되었을 수 있습니다. 밑에 있는 버튼을 통해 홈페이지로 돌아가주세요.`}
                highlightWords={["404", "Page", "Not", "Found"]}
                highlightClass="highlighted"
                trigger="click"
                backgroundColor="transparent"
                wireframes={false}
                gravity={0.1}
                fontSize="3rem"
                mouseConstraintStiffness={0.9}
            />
            <Link to='/' className='projects-content'><button className='btn btn-secondary btn-lg'>홈으로 돌아가기</button></Link>
        </div>
    );
};
  
export default NotFound;