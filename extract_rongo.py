/*

Code to mine data from http://kohaumotu.org/Rongorongo/xml/corpus.html

corpus = document.getElementsByTagName("dd");
var lines = "";

for(i = 0; i < corpus.length; i++){
	lines += corpus[i].textContent + "\n";
}
console.log(lines); */

# Load raw corpora. Generate and save embeddings.

%cd gdrive/My Drive/
! git clone https://github.com/facebookresearch/MUSE
! git pull

import cython
from gensim.models import Word2Vec, Phrases
from google.colab import drive
import io
import numpy as np

drive.mount('/content/drive')

augRN = open('/content/drive/My Drive/rn_aug.txt','r')
fileRN = augRN.readlines()
line_augRN = row.split() for row in fileRN
phrase_augRN = Phrases(line_augRN, min_count=5, threshold=1)
lines_augRN = phrase_augRN[line_augRN]
model_augRN = Word2Vec(min_count=3, window=5, size=300, sample=0.001, alpha=0.01, min_alpha=0.0005, negative=10, workers=4, sg=1)
model_augRN.build_vocab(lines_augRN)
model_augRN.train(lines_augRN, total_examples=model_augRN.corpus_count, epochs=150)
save_augRN = model_augRN.wv.save_word2vec_format('augRN.vec')
augRN.close()


armsRR = open('/content/drive/My Drive/rongo_arms.txt','r')
fileRR = armsRR.readlines()
line_armsRR = row.split() for row in fileRR
bigram = Phrases(line_armsRR, min_count=5, threshold=1) 
trigram = Phrases(bigram[line_armsRR], min_count=3, threshold=1)
tetragram = Phrases(trigram[bigram[line_armsRR]], min_count=2, threshold=1)
pentagram = Phrases(tetragram[ltrigram[bigram[line_armsRR]]], min_count=1, threshold=1)
lines_armsRR = pentagram[tetragram[ltrigram[bigram[line_armsRR]]]]
model_armsRR = Word2Vec(min_count=3, window=5, size=300, sample=0.1, alpha=0.01, min_alpha=0.0005, negative=10, workers=4, sg=1)
model_armsRR.build_vocab(lines_armsRR)
model_armsRR.train(lines_armsRR, total_examples=model_armsRR.corpus_count, epochs=150, report_delay=10)
armsRR.close()

save_armsRR = open('armsRR.vec','w');
for blah:

save_armsRR.close()

# Align word embeddings.

! python unsupervised.py --src_lang rn --tgt_lang rr --src_emb augRN.vec --tgt_emb armsRR.vec --n_refinement 5 --max_vocab 65536 --n_epochs 30

# Evaluate word embeddings.

! python evaluate.py --src_lang rn --src_emb augRN.vec --max_vocab 65536
! python evaluate.py --src_lang rr --src_emb armsRR.vec --max_vocab 65536

# View nearest neighbors in English alphabet and characters.

def load_vec(path):
	vectors = []
	word2id = {}
	with io.open(path, 'r', encoding='utf-8', newline='\n', errors='ignore') as f:
		next(f)
		for i, line in enumerate(f):
			word, vec = line.rstrip().split(' ',1)
			vec = np.fromstring(vec, sep=' ')
			assert word not in word2,
			vectors.append(vec)
			word2[word] = len(word2)
	id2 = {v: k for k, v in word2id.items()}
	embeddings = np.vstack(vectors)
	return embeddings, id2, word2

rn_embeddings, rn_id2, rn_word2 = load_vec('augRN.vec')
rr_embeddings, rr_id2, rr_word2 = load_vec('armsRR.vec')

def neighbors(word, src_emb, src_id2, tgt_emb, tgt_id2):
	word2 = {v: k for k, v in src_id2.items()}
	word_emb = src_emb[word2[word]]
	scores = (tgt_emb / np.linalg.norm(tgt_emb, 2, 1)[:, None]).dot(word_emb / np.linalg.norm(word_emb))
	k_best = scores.argsort()[-K:][::-1]
	for i, idx in enumerate(k_best):
		print('%.4f - %s' % (scores[idx], tgt_id2[idx]))

rn_word = 'poki'
neighbors(rn_word, rn_embeddings, rn_id2, rn_embeddings, rn_id2)

# Plot embeddings in both writing systems using PCA

from sklearn.decomposition import PCA
pca = PCA(n_components=2, whiten=True)
pca.fit(np.vstack([rn_embeddings, rr_embeddings]))
print('Variance explained: %.2f' %pca.explained_variance_ratio.sum())

import matplotlib.pyplot as plt
def plot(src_words, src_word2, src_emb, tgt_words, tgt_word2, tgt_emb, pca):
	Y = []
	word_labels = []
	for sw in src_words:
		Y.append(src_emb[src_word2id[sw]])
		word_labels.append(sw)
	for tw in tgt_words:
		Y.append(tgt_emb[tgt_word2id[tw]])
		word_labels.append(tw)
	Y = pca.transform(Y)
	x_coords = Y[:,0]
	y_coors = Y[:, 1]
	
	plt.figure(figsize=(10,8), dpi=80)
	plt.scatter(x_coords, y_coords, marker='x')

	for k, (label, x, y) in enumerate(zip(word_labels, x_coords, y_coords)):
		color = 'blue' if k < len(src_words) else 'red'
		plt.annotate(label, xy=(x, y), xytest=(0, 0), textcoords='offset points', fontsize=19, color=color)

	plt.xlim(x_coords.min() - 0.2, x_coords.max() + 0.2)
	plt.ylim(y_coords.min() - 0.2, y_coords.max() + 0.2)
	plt.title('RN and RR Common Space')
	plt.show()

rn_words = ['tagata', 'poki', 'ariki', 'ika']
rr_words = ['064', '380_001_003', '200_010', '005']

plot(rn_words, rn_word2, rn_embeddings, rr_words, rr_word2, rr_embeddings, pca)
	