'use client'

import React from 'react'
import { useParams } from 'next/navigation'

type ProductDetail = {
  name: string
  price: string
  category: string
  image: string
  summary: string
  sizeInfo: string
  fabric: string
  thickness: string
  stretch: string
  lining: string
  seeThrough: string
  notice: string
  origin: string
  manufacturer: string
  shipping: string
  comment: string
}

const PRODUCT_DETAILS: Record<number, ProductDetail> = {
  1: {
    name: '베이직 오버핏 후드',
    price: '₩45,000',
    category: 'Top',
    image: '/후드.png',
    summary:
      '넉넉한 오버핏과 부드러운 기모 안감으로 데일리로 입기 좋은 기본 후드티입니다. 힙을 덮는 기장으로 체형을 자연스럽게 커버해 주며, 어떤 하의와도 잘 어울리는 아이템이에요.',
    sizeInfo: `FREE
어깨 65  가슴 54  밑단 57  암홀 24  소매 48  총장 57.5`,
    fabric: '폴리 60% + 코튼 40%',
    thickness: '두꺼움',
    stretch: '약간 있음',
    lining: '기모 안감 있음',
    seeThrough: '없음',
    notice: '세탁 시 뒤집어서 찬물 단독 세탁 또는 드라이 클리닝을 권장합니다.',
    origin: '중국',
    manufacturer: '협력업체',
    shipping: '지금 주문 시 영업일 기준 1~3일 내 출고됩니다.',
    comment: `쫀쫀한 기모 안감 덕분에 한겨울까지 든든하게 입기 좋은 후드예요.
힙을 충분히 덮어주는 기장이라 레깅스, 조거팬츠랑 코디하기도 편하고요.
어깨선이 살짝 드롭되어 있어서 상체가 좁아 보이는 효과도 있어요.
안에 티 한 장만 입어도 답답하지 않고, 후드 끈 디테일로 포인트를 줬어요.
베이직한 컬러 구성이라 데님, 슬랙스, 스커트 어디에나 무난하게 잘 어울립니다.
하나만 가지고 있어도 데일리룩 걱정 줄여주는, 진짜 기본템 후드예요.`,
  },
  2: {
    name: '와이드 데님 팬츠',
    price: '₩52,000',
    category: 'Bottom',
    image: '/와이드.png',
    summary:
      '과하지 않은 세미 와이드 핏 데님 팬츠입니다. 자연스러운 워싱과 헤짐 디테일이 빈티지 무드를 살려주며, 발등을 살짝 덮는 기장으로 다리가 길어 보이는 실루엣을 연출합니다.',
    sizeInfo: `S / M / L
S : 허리 36  힙 50  허벅지 30  밑위 28  밑단 22  총장 100
M : 허리 38  힙 52  허벅지 31  밑위 29  밑단 23  총장 101
L : 허리 40  힙 54  허벅지 32  밑위 30  밑단 24  총장 102`,
    fabric: '코튼 100%',
    thickness: '보통',
    stretch: '없음 (탄탄한 난스판 데님)',
    lining: '없음',
    seeThrough: '없음',
    notice:
      '워싱 특성상 제품마다 미세한 컬러 차이와 스크래치는 자연스러운 현상입니다.',
    origin: '베트남',
    manufacturer: '협력업체',
    shipping: '지금 주문 시 영업일 기준 2~4일 내 출고됩니다.',
    comment: `허벅지는 편안하게, 밑단으로 갈수록 자연스럽게 떨어지는 세미 와이드 핏이에요.
허리는 안정감 있게 잡아주지만, 다리 라인은 여유 있어서 체형 커버에 정말 좋아요.
무릎 부분 은은한 워싱이 다리가 더 곧아 보이게 연출해 줍니다.
맨투맨, 셔츠, 니트 어디에나 잘 어울리는 기본 중청 컬러라 활용도가 높아요.
탄탄한 난스판 데님이라 오래 입어도 쉽게 늘어나지 않는 것도 장점이에요.
평소 데님 자주 입으신다면, 꼭 하나쯤 가지고 있으면 좋을 데일리 팬츠입니다.`,
  },
  3: {
    name: '캔버스 스니커즈',
    price: '₩69,000',
    category: 'Shoes',
    image: '/컨버스.jpg',
    summary:
      '심플한 로우컷 디자인의 캔버스 스니커즈입니다. 가벼운 착화감과 쿠션감 있는 인솔로 장시간 착용해도 편안하며, 데일리 룩에 부담 없이 매치하기 좋아요.',
    sizeInfo: `230~280 (5단위)
발볼 : 보통 / 굽높이 : 약 2.5cm`,
    fabric: '겉감 : 캔버스  /  바닥 : 러버',
    thickness: '보통',
    stretch: '없음',
    lining: '부분 패브릭 안감',
    seeThrough: '해당 없음',
    notice:
      '밝은 컬러 특성상 오염에 주의해 주세요. 사이즈가 애매할 경우 반 사이즈 업을 추천드립니다.',
    origin: '중국',
    manufacturer: '협력업체',
    shipping: '지금 주문 시 영업일 기준 1~3일 내 출고됩니다.',
    comment: `유행 타지 않는 기본 로우 스니커즈 디자인이라 어떤 룩에도 자연스럽게 어울려요.
러버솔이 너무 무겁지 않아서 장시간 걸어도 발에 부담이 적은 편입니다.
발등을 안정적으로 감싸는 라인이라 끈을 살짝만 조여도 핏이 딱 잡혀요.
데님, 조거팬츠, 롱스커트까지 두루 매치하기 좋고, 특히 캐주얼 코디에 잘 어울려요.
데일리용 운동화를 찾고 계시다면 가성비 좋은 선택이 될 거예요.`,
  },
  4: {
    name: '레더 크로스백',
    price: '₩89,000',
    category: 'Bag',
    image: '/레더.png',
    summary:
      '은은한 광택의 퀼팅 레더 크로스백입니다. 골드 체인 스트랩과 직사각형 쉐입이 조화를 이루어 세련된 분위기를 연출해 주며, 데일리룩부터 하객룩까지 두루 활용 가능합니다.',
    sizeInfo: `ONE SIZE
가로 23  세로 15  폭 7  스트랩 최대 115 (조절 가능)`,
    fabric: '합성 피혁 (PU)',
    thickness: '보통',
    stretch: '없음',
    lining: '전체 안감 있음',
    seeThrough: '없음',
    notice: '가죽 소재 특성상 미세한 주름과 스크래치는 자연스러운 현상입니다.',
    origin: '중국',
    manufacturer: '협력업체',
    shipping: '지금 주문 시 영업일 기준 1~3일 내 출고됩니다.',
    comment: `미니멀한 사이즈지만 지갑, 휴대폰, 립 정도는 알차게 들어가는 실용적인 크기예요.
은은하게 반짝이는 골드 체인 덕분에 기본 티셔츠 위에만 들어줘도 확실한 포인트가 됩니다.
직사각형 쉐입이라 코트나 자켓 위에 메도 핏이 깔끔하게 떨어져요.
하객룩, 데이트룩, 회식 자리까지 두루 사용할 수 있는 활용도 높은 가방이에요.
개인적으로 ‘옷은 심플한데 가방으로 포인트 주고 싶은 날’에 추천드리고 싶은 아이템입니다.`,
  },
  5: {
    name: '스트라이프 셔츠',
    price: '₩39,000',
    category: 'Top',
    image: '/스트라이프.png',
    summary:
      '잔잔한 세로 스트라이프 패턴의 루즈핏 셔츠입니다. 힙을 덮는 기장과 여유 있는 품으로 단독은 물론, 니트나 맨투맨 안에 레이어드하기에도 좋은 아이템이에요.',
    sizeInfo: `FREE
어깨 52  가슴 59  암홀 24  소매 57  총장 73`,
    fabric: '코튼 60% + 폴리 40%',
    thickness: '보통',
    stretch: '없음',
    lining: '없음',
    seeThrough: '밝은 컬러는 약간 비침이 있을 수 있습니다. (스킨톤 이너 권장)',
    notice: '첫 세탁은 드라이 클리닝 또는 찬물 단독 세탁을 권장합니다.',
    origin: '한국',
    manufacturer: '협력업체',
    shipping: '지금 주문 시 영업일 기준 1~2일 내 출고됩니다.',
    comment: `세로 스트라이프 패턴이 상체 라인을 더 슬림하게 잡아주는 셔츠예요.
품이 넉넉해서 단독으로 입으면 내추럴한 루즈핏, 니트 안에 레이어드하면 단정한 느낌이 납니다.
힙을 덮는 기장이라 스키니나 슬랙스랑 입었을 때 안정감 있게 떨어져요.
소매를 두세 번 롤업해서 입으면 더 캐주얼하고 시원한 분위기로 연출할 수 있습니다.
하나쯤 갖고 있으면 봄·가을은 물론, 사계절 내내 활용하기 좋은 기본 셔츠예요.`,
  },
  6: {
    name: '카고 조거 팬츠',
    price: '₩48,000',
    category: 'Bottom',
    image: '/카고.jpg',
    summary:
      '트렌디한 카고 포켓 디테일의 조거 팬츠입니다. 허리 전체 밴딩과 스트링으로 편하게 착용할 수 있으며, 발목 시보리로 스니커즈와 매치했을 때 핏이 깔끔하게 떨어져요.',
    sizeInfo: `FREE
허리 32~42(밴딩)  힙 54  허벅지 32  밑위 30  밑단 12~18(시보리)  총장 100`,
    fabric: '코튼 97% + 스판 3%',
    thickness: '보통',
    stretch: '약간 있음',
    lining: '없음',
    seeThrough: '없음',
    notice: '밴딩 특성상 사이즈 측정 시 1~3cm 정도 오차가 있을 수 있습니다.',
    origin: '중국',
    manufacturer: '협력업체',
    shipping: '지금 주문 시 영업일 기준 1~3일 내 출고됩니다.',
    comment: `허리 전체 밴딩과 스트링 덕분에 체형에 크게 구애받지 않고 편하게 입을 수 있어요.
양옆 카고 포켓이 지나치게 부해 보이지 않도록 적당한 위치에 들어가 있는 게 포인트예요.
발목 시보리가 발등에서 딱 잡아줘서 스니커즈랑 코디했을 때 다리 라인이 깔끔해 보입니다.
맨투맨이나 크롭 후드와 함께 입으면 힙한 스트릿 룩으로 연출하기 좋아요.
편하면서도 스타일 놓치기 싫은 날, 손이 자주 갈 조거 팬츠입니다.`,
  },
}

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>()
  const productId = Number(params.id)
  const product = PRODUCT_DETAILS[productId]

  if (!product) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div
          style={{
            padding: '40px 32px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          }}
        >
          <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>
            상품을 찾을 수 없습니다.
          </h1>
        </div>
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '40px 16px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '18px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          padding: '32px 32px 40px',
        }}
      >
        {/* 상단 breadcrumb */}
        <div
          style={{
            fontSize: '12px',
            color: '#888',
            marginBottom: '12px',
          }}
        >
          HOME &gt; {product.category} &gt; {product.name}
        </div>

        {/* 상단: 이미지 + 기본 정보 */}
        <section
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'flex-start',
            marginBottom: '32px',
          }}
        >
          {/* 왼쪽 이미지 */}
          <div
            style={{
              flex: 1,
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid #eee',
              backgroundColor: '#fafafa',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '480px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* 오른쪽 텍스트 */}
          <div style={{ flex: 1.1 }}>
            <p
              style={{
                fontSize: '13px',
                color: '#9ca3af',
                marginBottom: '4px',
              }}
            >
              {product.category}
            </p>
            <h1
              style={{
                fontSize: '26px',
                fontWeight: 700,
                marginBottom: '10px',
              }}
            >
              {product.name}
            </h1>
            <p
              style={{
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '16px',
              }}
            >
              {product.price}
            </p>

            <p
              style={{
                fontSize: '14px',
                color: '#4b5563',
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
                marginBottom: '16px',
              }}
            >
              {product.summary}
            </p>

            {/* COMMENT 박스 */}
            <div
              style={{
                borderRadius: '16px',
                backgroundColor: '#f9fafb',
                padding: '16px 18px',
                border: '1px solid #e5e7eb',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#6b21a8',
                  marginBottom: '8px',
                }}
              >
                # Comment
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: '#4b5563',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {product.comment}
              </p>
            </div>
          </div>
        </section>

        {/* 하단 상세정보 */}
        <section>
          <h2
            style={{
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            상세정보
          </h2>

          <div
            style={{
              borderTop: '1px solid #e5e7eb',
              paddingTop: '24px',
              display: 'flex',
              gap: '32px',
            }}
          >
            {/* 왼쪽: 사이즈 / 원단 */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
                SIZE (cm)
              </h3>
              <div
                style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  fontSize: '13px',
                  whiteSpace: 'pre-line',
                }}
              >
                {product.sizeInfo}
              </div>

              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  marginTop: '18px',
                  marginBottom: '8px',
                }}
              >
                FABRIC
              </h3>
              <div
                style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '13px',
                }}
              >
                {product.fabric}
              </div>
            </div>

            {/* 오른쪽: INFORMATION / NOTICE */}
            <div style={{ flex: 1.2 }}>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
                INFORMATION
              </h3>
              <div
                style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  lineHeight: 1.6,
                }}
              >
                <div>두께감 : {product.thickness}</div>
                <div>신축성 : {product.stretch}</div>
                <div>안감 : {product.lining}</div>
                <div>비침 : {product.seeThrough}</div>
              </div>

              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  marginTop: '18px',
                  marginBottom: '8px',
                }}
              >
                NOTICE
              </h3>
              <div
                style={{
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '13px',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                }}
              >
                {product.notice}
              </div>

              <div
                style={{
                  marginTop: '18px',
                  fontSize: '12px',
                  color: '#6b7280',
                  lineHeight: 1.6,
                }}
              >
                제조국 : {product.origin}
                <br />
                제조사 : {product.manufacturer}
                <br />
                배송안내 : {product.shipping}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
