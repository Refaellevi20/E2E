import { StarRating } from '../../cmps/review/StarRating'
import { LongTxt } from '../../cmps/LongTxt'
import { useEffect, useState } from 'react'

export function UserInfo({ user_id, compact, gig }) {
    const [user, setUser] = useState(null)
    console.log(user)

    useEffect(() => {
        loadUser()
    }, [])


    async function loadUser() {
        try {
            const user = await userService.getById(user_id)
            setUser(user)
        } catch (err) {
            console.log('user =>', err)
        }
    }

    if (!user) return <div className="loader-container">
        <div className="loader"></div>
    </div>


    return compact ? (
        <div className="user">
            <img src={user.imgUrl} alt="user-img" className="profile-picture" />
            <div className="user-info">
                <div className="user-name-level">
                    <span className="user-name">{user.fullname}</span>
                    <div className="user-level">
                        <div className="level">
                            {user.level === 'level 3' ? 'Top Rated' : `Level ${user.level}`}
                        </div>
                        <div
                            className="level-icons"
                            style={user.level === 3 ? { backgroundColor: '#ffe0b3', padding: '4px', borderRadius: '5px' } : {}}
                        >
                            <div className={`level-icons ${user.level === 3 ? 'top-rated' : ''}`}></div>
                            {[...Array(3)].map((_, idx) => (
                                <svg
                                    key={idx}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 10 10"
                                    width="10"
                                    height="10"
                                    fill={idx < user.level ? "black" : "gray"}
                                    style={{ marginLeft: "4px" }}
                                    className="owner-level-preview"
                                >
                                    <path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="stars">
                    <StarRating value={user.rate} />
                    <span className="reviews-num">
                        ({user.reviews ? user.reviews.length : 1}  reviews)
                    </span>
                </div>
            </div>
        </div>
    ) : (
        <div className="contact-info">
            <h3 className='get-to-know'>Get to know {user.fullname}</h3>
            <div className="contact-info-user">
                <img src={user.imgUrl} alt="user-img" className="contact-info-profile-picture" />
                <div className="user-info">
                    <div className="contact-info-user-name-level">
                        <span className="contact-info-user-name">{user.fullname}</span>
                        <div className="contact-info-user-level">
                            <div className="contact-info-level">
                                {user.level === 'level 3' ? 'Top Rated' : `Level ${user.level}`}
                            </div>
                            <div className="level-icons">
                                {[...Array(3)].map((_, idx) => (
                                    <svg
                                        key={idx}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 10 10"
                                        width="10"
                                        height="10"
                                        fill={idx < user.level ? "black" : "gray"}
                                        style={{ marginLeft: "4px" }}
                                        className='owner-level-preview'
                                    >
                                        <path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="contact-info-stars">
                        <StarRating value={user.rate} />
                        <span className="contact-info-reviews-num">
                            ({user.reviews ? user.reviews.length : 1}  reviews)
                        </span>
                    </div>
                </div>
            </div>
            <button className="contact-me">Contact me</button>
            {/* {gig && <button><Link to={`/user/${gig.owner._id}`}>Contact Me</Link></button>} */}
            <div style={{ padding: '24px 0 0', fontFamily: 'Macan', fontSize: '16px' }}>
                <div className="owner-description">
                    <ul>
                        <li><strong><span>From</span></strong><span>Israel</span></li>
                        <li><strong><span>Member since</span></strong><span>userOrders</span></li>
                        <li><strong><span>Avg. response time</span></strong><span>5 hours</span></li>
                        <li><strong><span>Last delivery</span></strong><span>about 1 hour</span></li>
                        <li><strong><span>Languages</span></strong><span>English</span></li>
                    </ul>
                    <p>
                        I have years of experience in creating 2d animated explainer videos. I would like to boost your business with my knowledge so that the orders with my 2D-Animation videos increase and your sales increase. You will see that you will only profit. Order now!
                    </p>
                </div>
            </div>
            {/* <div>
                <p className='under-Languages'>
                    {user.description}
                </p>
                <LongTxt txt={user.description} length={length} />
            </div> */}
        </div>
    )
}