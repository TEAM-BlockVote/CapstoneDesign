import React from "react";

function Post2() {
  return (
    <div style={{ 
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f7f7f7",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
    }}>
      <h1 style={{ 
        fontSize: "36px",
        marginBottom: "10px"
      }}>게시글 제목</h1>
      <div style={{ 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        width: "100%"
        
      }}>
        <p style={{ 
          fontSize: "16px",
          fontWeight: "bold"
        }}>작성자: 이서진</p>
        <p style={{ 
          fontSize: "16px"
        }}>작성일: 2023.5.5 / 조회수: 3</p>
      </div>
      <hr />
      <p style={{ 
        fontSize: "18px",
        lineHeight: "1.5",
        textAlign: "justify"
      }}>
       백년전쟁(1337-1453)은 영국과 프랑스의 100년간의 전쟁이었다. 이전의 영국 왕들이 프랑스 왕좌에 대한 공격을 계속 시도하면서 시작되었다. 이후 프랑스의 장수 조안다르크와 영국의 헨리 5세의 싸움에서 영국이 승리를 거둬 장수조안다르크가 포로로 잡혀 가라앉았다
      </p>
    </div>
  );
}

export default Post2;
