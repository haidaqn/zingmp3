import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight , Header,Loading} from '../../components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';

const Public = () => {

  const [isShowSidebarRight, setIsShowSidebarRight] = useState(true);
  const { isLoading} = useSelector(state => state.app);

  //

  return (
    <div className="w-full h-screen flex flex-col bg-[#170f23]">
      <div className='w-full h-full flex flex-auto'>
        <div className="w-[240px] flex-none bg-[hsla(0,0%,100%,0.05)] ">
          <SidebarLeft/>
        </div>
        <div className={`flex-auto relative flex flex-col px-[59px] ${!isShowSidebarRight ? 'animate-slide-right-1' : 'animate-slide-left-1'}`}>
          {isLoading && <div className='absolute top-0 bottom-0 right-0 left-0 bg-[#170F23] opacity-90 z-30 flex justify-center items-center'>
            <Loading/>
          </div>}
          <div className='h-[70px] flex-none items-center text-[#544e5c] mb-5'>
            <Header />
          </div>
          <div className='flex-auto w-full'>
            <Scrollbars style={{width:'100%', height : '100%'}}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>
        <div>
          {isShowSidebarRight && (<div className="animate-slide-left w-[330px] hidden 1600:flex flex-none border-l-[1px] border-[#2d2537] bg-[#170f23]">
            <SidebarRight />
            </div>)
          }
        </div>
      </div>
      <div className='flex-none z-50 h-[90px] border-t-[1px] border-[#2d2537]'>
        <Player setIsShowSidebarRight={setIsShowSidebarRight} />
      </div>
    </div>
  )
}

export default Public;
