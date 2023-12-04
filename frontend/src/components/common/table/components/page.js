import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { range } from 'lodash';
import React, { useContext, useMemo } from 'react';
import { Select, MenuItem } from '@mui/material';

const PageNum = ({ text, onClick, active }) => {
  return (
    <div
      className={`w-7 h-7 flex items-center justify-center rounded-md  font-bold shadow-md cursor-pointer ${
        active ? 'bg-blue-400 text-zinc-50' : 'bg-zinc-200 text-zinc-600'
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

function TablePage({ context }) {
  const { metadata, controllers } = useContext(context);
  const { total, totalPage, page, pageSize } = metadata || {};
  const { nextPage, prevPage, toPage, setPageSize } = controllers;
  const pages = useMemo(() => {
    if (totalPage === 1) {
      return [];
    }
    if (totalPage > 5) {
      if (page === 2 || page === 1) {
        return [2, 3, 4];
      }
      if (page === totalPage - 1 || page === totalPage) {
        return [totalPage - 3, totalPage - 2, totalPage - 1];
      }

      return [page - 1, page, page + 1];
    }

    return range(2, totalPage);
  }, [totalPage, page]);

  if (!metadata) return null;

  return (
    <div className="flex gap-4 items-center justify-center text-zinc-600 text-xs">
      <div className="">共 {total} 項</div>

      <div className="cursor-pointer">
        <KeyboardArrowLeft onClick={prevPage} />
      </div>

      <div className="flex gap-3">
        <PageNum text="1" active={page === 1} onClick={() => toPage(1)} />
        {pages.map((item) => (
          <PageNum text={item} active={page === item} onClick={() => toPage(item)} />
        ))}
        {totalPage > 1 && <PageNum text={totalPage} active={page === totalPage} onClick={() => toPage(totalPage)} />}
      </div>

      <div className="cursor-pointer">
        <KeyboardArrowRight onClick={nextPage} />
      </div>

      <div className="">共 {totalPage} 頁</div>

      <div className="flex items-center gap-2">
        <div className="">每頁顯示</div>
        <Select
          size="small"
          value={pageSize}
          onChange={(v) => {
            setPageSize(v.target.value);
          }}
          sx={{
            '.MuiOutlinedInput-input': {
              padding: '4px 16px',
              fontSize: '12px'
            }
          }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
        <div className="">項</div>
      </div>
    </div>
  );
}

export default TablePage;
