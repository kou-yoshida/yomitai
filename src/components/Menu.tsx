"use client";
import { Menu as _Menu } from "@headlessui/react";
import { Link } from "@/src/components/link/Link";
import { Button } from "./button/Button";
import { MenuSp } from "./MenuSp";

export const Menu = () => {
  return (
    <>
      <_Menu>
        <_Menu.Button as="div">
          <Button>More</Button>
        </_Menu.Button>
        <_Menu.Items className="w-full">
          <_Menu.Item as="div">
            {
              <Link width="full" path="/example">
                Todo一覧
              </Link>
            }
          </_Menu.Item>
          <_Menu.Item as="div">
            {
              <Link width="full" path="/example">
                タイムライン
              </Link>
            }
          </_Menu.Item>
          <_Menu.Item as="div">
            {
              <Link width="full" path="/example">
                example
              </Link>
            }
          </_Menu.Item>
          <_Menu.Item as="div">
            {
              <Link width="full" path="/">
                ホーム
              </Link>
            }
          </_Menu.Item>
        </_Menu.Items>
      </_Menu>

      <MenuSp />
    </>
  );
};
