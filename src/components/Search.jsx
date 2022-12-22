import React from 'react'
import icons from '../utils/icon';

const { FiSearch } = icons;

const Search = () => {
  return (
    <div className="w-full flex items-center ">
      <span className ="bg-[#2f2739] pl-4 h-10 flex items-center justify-center rounded-l-[20px]"><FiSearch size={20}/></span>
      <input type="text"
        className="outline-none px-4 py-2 h-10 w-full bg-[#2f2739] rounded-r-[20px]"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
      />
    </div>
  )
}

export default Search
