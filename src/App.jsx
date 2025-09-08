import { useState } from "react";
import { FaFolder, FaChevronDown, FaChevronRight } from "react-icons/fa";

const categoriesData = [
  { id: 1, name: "Electronics", children: [ { id: 2, name: "Phones", children: [ { id: 3, name: "iPhone", children: [] }, { id: 4, name: "Samsung", children: [] } ] }, { id: 5, name: "Laptops", children: [ { id: 6, name: "MacBook", children: [] }, { id: 7, name: "Windows Laptop", children: [] } ] } ] },
  { id: 8, name: "Clothing", children: [ { id: 9, name: "Men", children: [] }, { id: 10, name: "Women", children: [] } ] }
];

function App() {
  const [checkedItems,setCheckedItems] = useState([]);
  const [expandedIds,setExpandedIds] = useState([]);
  const getAllChildIds = (category)=>category.children.reduce((acc,child)=>[...acc,child.id,...getAllChildIds(child)],[]);
  const getParentIds = (id,categories,parents=[])=>{
    for(const category of categories){
      if(category.id===id) return parents;
      if(category.children.length>0){
        const result=getParentIds(id,category.children,[...parents,category.id]);
        if(result) return result;
      }
    }
    return null;
  };
  const handleCheck = (category,isChecked)=>{
    const allChildIds=getAllChildIds(category);
    if(isChecked){
      const parentIds=getParentIds(category.id,categoriesData)||[];
      setCheckedItems(prev=>[...new Set([...prev,category.id,...allChildIds,...parentIds])]);
    }else{
      setCheckedItems(prev=>prev.filter(id=>id!==category.id&&!allChildIds.includes(id)));
    }
  };
  const getCategoryNameById=(id,categories)=>{
    for(const category of categories){
      if(category.id===id) return category.name;
      if(category.children.length>0){
        const name=getCategoryNameById(id,category.children);
        if(name) return name;
      }
    }
    return null;
  };
  const getCategoryLevelById=(id,categories,level=0)=>{
    for(const category of categories){
      if(category.id===id) return level;
      if(category.children.length>0){
        const childLevel=getCategoryLevelById(id,category.children,level+1);
        if(childLevel!==null) return childLevel;
      }
    }
    return null;
  };
  const toggleExpand=(id)=>{setExpandedIds(prev=>prev.includes(id)?prev.filter(eid=>eid!==id):[...prev,id]);};
  const renderCategory=(category,level=0)=>{
    const isChecked=checkedItems.includes(category.id);
    const hasChildren=category.children.length>0;
    const isExpanded=expandedIds.includes(category.id);
    return (
      <div key={category.id} className={`ml-${level*4} mt-1`}>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer flex-1">
            <input type="checkbox" checked={isChecked} onChange={e=>handleCheck(category,e.target.checked)} className="accent-blue-500"/>
            <FaFolder className="text-blue-500"/>
            <span>{category.name}</span>
          </label>
          {hasChildren&&(
            <button onClick={()=>toggleExpand(category.id)} className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
              {isExpanded?<FaChevronDown/>:<FaChevronRight/>}
            </button>
          )}
        </div>
        {hasChildren&&isExpanded&&(
          <div className="ml-5 mt-1 space-y-1 border-l border-gray-200 pl-3">
            {category.children.map(child=>renderCategory(child,level+1))}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <aside className="w-full md:w-64 bg-white  p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
        <div>{categoriesData.map(category=>renderCategory(category))}</div>
      </aside>
      <main className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to the Store</h1>
        <p className="text-gray-600 mt-2">Browse categories by selecting checkboxes from the sidebar.</p>
        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold mb-2">Selected Categories:</h3>
          <div className="flex flex-wrap gap-2">
            {checkedItems.map(id=>{
              const level=getCategoryLevelById(id,categoriesData);
              return <span key={id} className={`px-3 py-1 rounded-full text-sm ${level===0?"bg-red-500 text-white":"bg-sky-400 text-white"}`}>{getCategoryNameById(id,categoriesData)}</span>;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
