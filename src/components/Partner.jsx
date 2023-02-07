import React from 'react'

const Connect = () => {

    var ListConnect = ["https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/universal-1.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/FUGA.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/beggers.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/orcahrd.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/jsj.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/monstercat.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/genie.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/yg.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/universal-1.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/FUGA.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/beggers.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/orcahrd.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/jsj.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/monstercat.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/genie.png",
                    "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/yg.png",
    ];

    return (
        <div className='w-full'>
            <div className='w-full flex items-center justify-center my-[30px]'>
                <span className='text-[#817D87] font-bold'>ĐỐI TÁC ÂM NHẠC</span>
            </div>
            <div className='flex flex-wrap gap-5 w-full mb-[40px]'>
                {
                    ListConnect.map((item,index) => (
                        <div key={index}
                            className='overflow-hidden rounded-[10px] bg-white flex flex-auto 
                                        items-center justify-center mb-[30px] h-[58px] w-[10%] '>
                                <img alt="ảnh" src={ item } className="max-w-[90%] max-h-[80%] w-auto" />
                        </div>
                    ))
                }
            </div>
        </div>
  )
}

export default Connect
