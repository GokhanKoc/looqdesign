{
  //Tüm kullanıcı bilgilerinin tutulacağı bölüm
  users: {
    //Otomatik yaratılan unique bir Id
    userId: {
      displayName : "Umut Hazal Koc",
      email : "umuthazalkoc@gmail.com",
      status: 'USER_REGISTERED_COMPLETE'   // Veya diğer durumlar...
      userType: "Personal"  // Kurumsal, Robot, Personal
      // Firebase Functions ile doldurulacak alan. 
      // Otomatik olarak verdiği tüm cevapların adedini toplayacağım.
      answerCounts : 7,
      // Firebase Functions ile doldurulacak alan. 
      // Otomatik olarak sorduğu soruların adedini toplayacağım.
      'questionCounts' : 7,
      // Firebase Functions ile doldurulacak alan. Toplam arkadaş sayısı.
      'totalFriendsCounts': 123
      // Toplam sahip olduğu harcanmamış token sayısı..
      // Transactions toplamlarından hesaplanacak
      // Her transaction geldiğinde Firebase functions ile otomatik olarak update olacak..
      looqtokens: 27.344
      categories: {
          "event" : true,
          "food" : false,
          "fun" : false,
          "hotel" : false,
          "surprise" : true
      }
      providers : {
        "googleUid" : "104024371948221004028",
        "facebookUid": "........"
      },
      friends : {
        userId: {
          source:  // Facebook, Google,Looq...
        }
      },
      // USER tarafından sorulan sorular
      questions: {
        questionId:
      },
      // Diğer kullanıcılar tarafından sorulmuş ve bu kullanıcının cevap vermesi için bekleyen sorular.
      // Kullanıcı cevap verdiğinde artık Messages alanından takip edilebilecek
      waitingAnswers : {
         questionId : {
           'createdAt' : 1489754607671,
           // Yaratılma zamanından 90 saniye sonra örneğin
           'finalDateTime': , 
           'viewedBy' : 'FALSE'
           'answered' : 'FALSE'
        }
      },
      // Kullanıcının dahil olduğu chat akışları
      chatRooms: {
        questionId: {
          chatRoomId: 'TRUE'
        }
      }
    }
  },
  // Tüm sorular
  questions: {
    questionId : {
      'askerUserId' : "LTp55GdFgPWiAe8qCXNBZLfrVKC3",
      'content' : "merhaba yeni soru",
      'createdAt' : 1490105946526,
      'status' : "new",   // NEW, WAITING, CLOSED...
      'type' : "Event",   // EVENT, FOOD, SURPRISE.....
      // Soru hangi lokasyonla ilgili
      location: {
        'latitude' : 41.0082376,
        'longitude' : 28.97835889999999,
        radius: 12
      }
      // Bu soru hangi kullanıcılara gönderildi. Cevaplar ne durumda.
      waitingAnswers: {
        userId: {
          'createdAt' : 1489754607671,
          'finalDateTime':  // Yaratılma zamanından 90 saniye sonra örneğin
          'viewedBy' : 'FALSE'
          'answered' : 'FALSE'
        }
      }
      //Bu soruyla ilgili açılmış chatroom odaları..
      //Soruya cevap verildiğinde bir chatroom açmış oluyoruz.
      chatRooms : {
        chatRoomId: 'TRUE'
      }
    },
  },
  //Chat ile ilgili tüm bilgiler
  chatRooms: {
    questionId : {
      // ChatRoom soruya cevap veren kullanıcı başına açılacak
      // Daha sonra soruyu soran ile cevap veren arasındaki iletişim bu chatroom üzerinden devam edecek
      chatRoomId : {
        members: {
          userId: "................"
        }
        messages: {
          messageId: {
            'content' : "Atatürk Heykelini gezebilirsin..",
            'createdAt' : 1489755103399,
            'latitude' : 39.941791328303154,
            'longitude' : 32.85478591918945,
            'sender' : "LTp55GdFgPWiAe8qCXNBZLfrVKC3",
            'status' : "TRUE"
          }
        }
      }
    }
  },
  //Token bilgileri
  looqtokens: {
    transactionsId: {
      fromUserId:
      toUserId:
      amount:
    }
  }
}
