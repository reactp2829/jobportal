import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CompnaiesTable() {
  const { companies, searchCompanyByText } = useSelector(
    (state) => state.company
  );
  //for temp variable
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length > 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div>
      <motion.div
        className="p-4"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <Table>
          <TableCaption>A list of recent registered Comapnaies</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.length <= 0 ? (
              <span>You have not created any companies</span>
            ) : (
              <>
                {filterCompany.length > 0 &&
                  filterCompany.map((company) => (
                    <tr>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={company?.logo} />
                        </Avatar>
                      </TableCell>
                      <TableCell>{company?.name}</TableCell>
                      <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                      <TableCell className="text-right">
                        <Popover>
                          <PopoverTrigger>
                            <MoreHorizontal />
                          </PopoverTrigger>
                          <PopoverContent className="w-32">
                            <div
                              onClick={() =>
                                navigate(`/admin/companies/${company._id}`)
                              }
                              className="flex items-center w-fit gap-2 cursor-pointer"
                            >
                              <Edit2 className="w-4" />
                              <span>Edit</span>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </tr>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
}

export default CompnaiesTable;
