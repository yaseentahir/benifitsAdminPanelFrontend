/* eslint-disable react/jsx-key */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { tableCellFormator } from "./tableCellFormator";
import { useBenefitsAdminPanelCtx } from "@/app/context";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

import DeletionModal from "../common/deletionModal";

const Table = ({ columns, data, source, specialCells = [] }) => {
  const router = useRouter();
  const deleteModalRef = useRef(null);
  const [deletionId, setDeletionId] = useState("");

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);
  const pathname = usePathname();
  const {
    _modalRef,
    defaultValues,
    setDefaultValues,
    setUpdateId,
    consent,
    setConsent,
  } = useBenefitsAdminPanelCtx();

  const handleUpdateBtnClk = (row) => {
    if (defaultValues.length === 0) return;

    const _data = Object.keys(defaultValues).reduce((result, key) => {
      result[key] = row[key] || "";
      return result;
    }, {});

    setUpdateId(row.id);
    setDefaultValues({ ..._data });

    if (_modalRef.current) {
      _modalRef.current.setOpenModal(true);
    }
  };

  useEffect(() => {
    console.log(pathname);
    router.push(pathname);
  }, [consent]);

  const handleDeleteBtnClk = async (row) => {
    setDeletionId(row.id);
    if (deleteModalRef.current) {
      deleteModalRef.current.setOpen(true);
    }
  };

  const deletionCallback = (id) => {
    data = data.filter((item) => item.id !== id);
    router.refresh();
  };

  const actions = [
    {
      icon: PencilIcon,
      handler: handleUpdateBtnClk,
      styles: "w-5 h-5 text-green-500 hover:text-black",
    },
    {
      icon: TrashIcon,
      handler: handleDeleteBtnClk,
      styles: "w-5 h-5 text-red-500 hover:text-black",
    },
  ];

  const totalCount = useMemo(() => data.length, [data]);

  return (
    <>
      <DeletionModal
        ref={deleteModalRef}
        source={source}
        id={deletionId}
        callback={deletionCallback}
      />

      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-300"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 whitespace-nowrap"
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}

              {actions.length !== 0 ? (
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              ) : (
                ""
              )}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={row.index % 2 === 0 ? undefined : "bg-gray-50"}
              >
                {row.cells.map((cell) => {
                  if (specialCells.includes(cell["column"].id)) {
                    if (cell["column"].id.includes(".")) {
                      let _c = cell["column"].id.split(".").pop();
                      cell.value = tableCellFormator[_c](cell.value);
                    } else
                      cell.value = tableCellFormator[cell["column"].id](
                        cell.value
                      );
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-3 py-4 text-sm text-gray-500"
                      >
                        {cell.value}
                      </td>
                    );
                  } else
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-3 py-4 text-sm text-gray-500"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                })}
                {actions.length !== 0 &&
                  (source === "protection" || source === "contact" ? (
                    <td>
                      <div className="flex flex-row justify-end items-center gap-2">
                        <button
                          className={actions[1].styles}
                          onClick={() => actions[1].handler(row.original)}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  ) : (
                    <td>
                      <div className="flex flex-row justify-end items-center gap-2">
                        {actions.map((action) => (
                          <button
                            className={action.styles}
                            onClick={() => action.handler(row.original)}
                          >
                            <action.icon />
                          </button>
                        ))}
                      </div>
                    </td>
                  ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
