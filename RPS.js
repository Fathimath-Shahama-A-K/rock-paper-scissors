 function ins(){
       const info= document.querySelector('.insInfo');
       
       if(info.innerHTML === ''){
       info.innerHTML=`
       
            🪨 Press R → Choose Rock <br>
            📄 Press P → Choose Paper <br>
            ✂️ Press S → Choose Scissors <br>
            🤖 Press A → Start Auto Play <br>

            Or, you can simply click the Rock, Paper, or Scissors buttons on the screen to make your choice.`;
      }else {
        info.innerHTML='';
      }

    }



        let score=JSON.parse(localStorage.getItem('score'))|| {
                wins:0,
                losses:0,
                Ties:0
            };
            updateScoreElement();
        // if(!score){
        //     score={
        //         wins:0,
        //         losses:0,
        //         Ties:0
        //     };
        // }
        let isAutoPlaying=false;
        let intervalId;
        function autoPlay(){
            if (!isAutoPlaying){
               intervalId= setInterval(function(){
                const playerMove= pickCmpMove();
                playGame(playerMove);

                },1000);
                isAutoPlaying=true;

            }else {
                clearInterval(intervalId);
                isAutoPlaying=false;

            }

            
        }
        document.querySelector('.keyRock')
        .addEventListener('click',() => {
            playGame('✊');

        });
        document.querySelector('.keyPaper')
        .addEventListener('click', () => {
            playGame('🖐️');
        });
        document.querySelector('.keyScissor')
            .addEventListener('click',() => {
                playGame('✌️');
            
        });
        document.querySelector('.keyAutoplay')
        .addEventListener('click', () => {
            autoPlay('isAutoPlaying');
        });



        document.body.addEventListener('keydown', (event) => {
            if(event.key === 'r'){
                playGame('✊');
            }else if(event.key === 'p'){
                playGame('🖐️');
            }else if(event.key === 's'){
                playGame('✌️');
            }else if(event.key === 'a'){
                autoPlay('isAutoPlaying');
            }
        });

        
         
        function playGame(playerMove){
            const cmpMove=pickCmpMove();
            console.log(cmpMove);
            let rslt='';

            if(playerMove==='✌️'){
                 if(cmpMove === '✊'){
                        rslt='You Lose';
                }else if(cmpMove === '🖐️'){
                         rslt='You Win!';
                }else if(cmpMove==='✌️'){
                        rslt='Tie';
                }
                
            }else if(playerMove==='🖐️'){
                    if(cmpMove === '✊'){
                        rslt='You Win!';
                    }else if(cmpMove === '🖐️'){
                        rslt='Tie';
                    }else if(cmpMove==='✌️'){
                        rslt='You Lose';
                    }

                }else if(playerMove==='✊'){
                    if(cmpMove === '✊'){
                         rslt='Tie';
                        }else if(cmpMove === '🖐️'){
                            rslt='You Lose';
                        }else if(cmpMove==='✌️'){
                            rslt='You Win!';
                        }
                }


            
                    if (rslt==='You Win!'){
                        score.wins+=1;
                    }else if(rslt==='You Lose'){
                        score.losses+=1;
                    }else if(rslt==='Tie'){
                        score.Ties+=1;
                    }

                    localStorage.setItem('score',JSON.stringify(score));

                    updateScoreElement();
                    document.querySelector('.js-result').innerHTML=rslt;
                    document.querySelector('.js-moves')
                    .innerHTML=`You Picked ${playerMove} | Computer Picked ${cmpMove}`;
           
            // alert(`you picked ${playerMove}. computer picked: ${cmpMove}. ${rslt} 
            // wins:${score.wins},losses:${score.losses},Ties:${score.Ties}`);
        }
        function updateScoreElement(){
            document.querySelector('.js-score')
                .innerHTML= `wins:${score.wins},losses:${score.losses},
                Ties:${score.Ties}`;
        }

         function pickCmpMove(){
            const randm = Math.random();
            let cmpMove='';
            if(randm >= 0 && randm <= 1/3){
               cmpMove='✊';
            }else if(randm >= 1/3 && randm<= 2/3){
               cmpMove='🖐️';
            }else if(randm >= 2/3 && randm<=1){
                cmpMove='✌️';
            }
            return cmpMove;
        }