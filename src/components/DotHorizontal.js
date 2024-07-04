import { Icon } from "@aws-amplify/ui-react";

export default function DotHorizontal({ width, height }) {
  return (
    <Icon ariaLabel="check">
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2"
          d="M6 12h.01m6 0h.01m5.99 0h.01"
        />
      </svg>
    </Icon>
  );
}
