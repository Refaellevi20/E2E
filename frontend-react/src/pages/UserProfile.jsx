import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { IoLocationOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { GiRoundStar } from "react-icons/gi";


import { loadUser, updateUser } from '../store/user/user.actions'
import { ImgUploader } from '../cmps/ImgUploader'

import { userService } from '../services/user/user.service.remote';
import { StarRating } from '../cmps/review/StarRating';

export function UserProfile({ watchedUser, userReviews }) {
  const user = useSelector(storeState => storeState.userModule.user)

  const loginUser = userService.getLoggedinUser()
  const [isSameUser, setIsSameUser] = useState(false)
  const { userId } = useParams()

  useEffect(() => {
    loginUser && loadUser(loginUser._id)
    if (userId === loginUser?._id) setIsSameUser(true)
    else setIsSameUser(false)
  }, [userId])

  function onUploaded(data) {
    const newUser = { ...user, imgUrl: data }
    updateUser(newUser)
  }

  return (
    <div className="user-profile">
      {userId && <>
        <div className="user-profile-info" >
          <div className="img-profile-container">
            {isSameUser && <div className="upload-camera "></div>}
            {isSameUser && <img src={loginUser?.imgUrl}></img>}
            {!isSameUser && <img src={watchedUser?.imgUrl}></img>}
            <div className='info-profile-details'>
              {isSameUser && <ImgUploader onUploaded={onUploaded} />}
            </div>

            <div style={{ marginLeft: '20px' }}>
              <h2 style={{fontSize:'28px',color:'#222325'}}>{watchedUser?.username}</h2>
              <li style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                <p>4.9 </p>
                <span style={{ margin: '0px 0px 10px 5px' }}>{userReviews} <StarRating style={{ color: 'black', fontWeight: 'bold', marginLeft: 'auto' }} /></span>
                <p style={{ margin: '0px 0px 10px 5px',textDecoration:'underLine' }}>(1)</p>
              </li>
              <p>Helping entrepreneurs build scalable digital products</p>
              <ul className="user-stats-desc">
                <div style={{ display: 'flex' }}>
                  <li>
                    <div><span className=" location-dot"></span><span><IoLocationOutline />
                    </span></div>
                    <span>America</span>
                  </li>
                  <li>
                    <div><span className="clock"></span><span><FiMessageCircle />
                    </span></div>
                    <span>Israel</span>
                  </li>
                  {/* <li>
            <div><span className="paper-plan"></span><span>Last Delivery</span></div>
            <span>1 day</span>
          </li> */}
                </div>
              </ul>
            </div>
          </div>
        </div>
        <h5 style={{fontSize: '16px', fontFamily:'macan-bold'}}>About Me</h5>
        <p style={{fontSize: '16px', fontFamily:'macan-light'}}>👋 Hi there! I'm Bensbahou Younes, a Top-Rated Full Stack web developer with 4+ years of expertise in JavaScript and Python. My services include: 🤖 AI Chatbot Development 💡 JavaScript Deobfuscation & Debugging 🕵️ Web Scraping & Automation 🌐 Custom Browser Extensions When you work with me, you'll get: 🔧 Professional Expertise 🕒 Prompt Communication 🚀 On-time Delivery 👁 Attention to Detail And some fun stuff planned 🤐. I'll be committed to delivering the best. Let's collaborate and turn your ideas into reality. Contact me now, and let's get started on your project!</p>
      </>}
    </div >

  )
}