import {css} from "@emotion/react"

export const globalStyles = css`
	:root {
		--background-color: #fdf9ee; /* 밝은 크림색 */
		--primary-color: #2b6e8e; /* 깊은 파란색 */
		--secondary-color: #f1a9a0; /* 부드러운 분홍색 */
		--accent-color: #f29e4c; /* 따뜻한 주황색 */
		--text-color: #3c3c3b; /* 어두운 회색 */
		--deep-text-color: #000; /* 더 진한 텍스트 색 */
		--link-color: #0e5a88; /* 파란색 링크 */
		--border-color: #d3c0b6; /* 부드러운 베이지색 */
		--background-code-color: #222;
		
		--font-family: 'Noto Sans KR', sans-serif;
		--font-size-base: 16px;
		--line-height-base: 1.6;
		
		// Language color
		--html-color: #E34F26;
		--css-color: #1572B6;
		--js-color: #F7DF1E;
	}
	
	[data-theme='dark'] {
		--background-color: #111; /* 어두운 회색 */
		--primary-color: #88c0d0; /* 부드러운 파란색 */
		--secondary-color: #d08770; /* 부드러운 오렌지색 */
		--accent-color: #ebcb8b; /* 밝은 노란색 */
		--text-color: #eceff4; /* 밝은 회색 */
		--deep-text-color: #fff; /* 더 진한 텍스트 색 */
		--link-color: #81a1c1; /* 밝은 파란색 링크 */
		--border-color: #4c566a; /* 어두운 회색 */
		
		--font-family: 'Noto Sans KR', sans-serif;
		--font-size-base: 16px;
		--line-height-base: 1.6;
	}
	
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		background-color: var(--background-color);
		color: var(--text-color);
		text-decoration: unset;
		font-family: "Nanum Gothic Coding", monospace;
		font-weight: 400;
		font-style: normal;
		
		// 드래그 방지
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none
	}
	
	body {
		width: 100vw;
	}
	
	main {
		width: 100%;
		padding: 2rem;
	}
	
	button {
		cursor: pointer;
		outline: none;
		border: none;
		border-radius: 16px;
		color: var(--text-color);
		background-color: var(--background-color);
	}
	
	b {
		font-weight: bold;
	}
	
	.draggable-text {
		-webkit-user-select: text;
		-moz-user-select: text;
		-ms-user-select: text;
		user-select: text
	}
`